#!/usr/bin/env node
/**
 * update-program.js
 * Reads the two Excel files from input/ and rebuilds:
 *   - content/event/program/{keynotes,talks,ignites,workshops}/*.md
 *   - content/event/speakers/*.md
 *   - data/sessions.json
 *   - data/speakers.json
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// ─── helpers ─────────────────────────────────────────────────────────────────

function slugify(name) {
    return name
        .toLowerCase()
        .normalize('NFD')                     // decompose accents
        .replace(/[\u0300-\u036f]/g, '')      // strip accent marks
        .replace(/[''`]/g, '')                // strip apostrophes
        .replace(/[^a-z0-9]+/g, '-')         // non-alphanum → dash
        .replace(/^-|-$/g, '');              // trim leading/trailing dashes
}

function convertTime(t) {
    // "09:15am - 10:00am" → "9:15 - 10:00"
    return t.replace(/(\d+):(\d+)(am|pm)\s*-\s*(\d+):(\d+)(am|pm)/i, (_, h1, m1, p1, h2, m2, p2) => {
        let hour1 = parseInt(h1);
        let hour2 = parseInt(h2);
        if (p1.toLowerCase() === 'pm' && hour1 !== 12) hour1 += 12;
        if (p1.toLowerCase() === 'am' && hour1 === 12) hour1 = 0;
        if (p2.toLowerCase() === 'pm' && hour2 !== 12) hour2 += 12;
        if (p2.toLowerCase() === 'am' && hour2 === 12) hour2 = 0;
        return `${hour1}:${m1} - ${hour2}:${m2}`;
    });
}

function writeFile(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('  wrote', filePath);
}

function rmDir(dir) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) rmDir(full);
        else fs.unlinkSync(full);
    }
}

// ─── load Excel files ─────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');

const sessionsWb = XLSX.readFile(
    path.join(ROOT, 'input', 'final', 'devopsdays-zurich-2026 accepted sessions - exported 2026-03-08.xlsx')
);
const scheduleWb = XLSX.readFile(
    path.join(ROOT, 'input', 'final', 'devopsdays-zurich-2026 schedulelist - exported 2026-03-08.xlsx')
);

const acceptedSessions = XLSX.utils.sheet_to_json(sessionsWb.Sheets['Accepted sessions']);
const acceptedSpeakers = XLSX.utils.sheet_to_json(sessionsWb.Sheets['Accepted speakers']);
const schedule = XLSX.utils.sheet_to_json(scheduleWb.Sheets['Schedule']);

// ─── build lookup maps ────────────────────────────────────────────────────────

// title → session record
const sessionByTitle = {};
for (const s of acceptedSessions) {
    sessionByTitle[s.Title.trim()] = s;
}

// speaker id → speaker record
const speakerById = {};
for (const sp of acceptedSpeakers) {
    speakerById[sp['Speaker Id']] = sp;
}

// ─── classify session type from schedule ─────────────────────────────────────

// mapping from partial title keywords to forced type (for non-speaker entries)
const OTHER_TITLES = [
    'Registration', 'Opening', 'Coffee', 'Break', 'Lunch', 'Closing',
    'Evening Event', 'Open Space Voting', 'Sponsor'
];

function guessOtherType(title) {
    const t = title.toLowerCase();
    if (t.includes('open space') && !t.includes('voting')) return 'openspace';
    return 'other';
}

function getSessionType(schedEntry) {
    const title = schedEntry.Title.trim();
    const isOther = OTHER_TITLES.some(kw => title.toLowerCase().includes(kw.toLowerCase()));
    if (isOther || !schedEntry.Speakers) {
        if (title.toLowerCase().includes('open space') && !title.toLowerCase().includes('voting')) return 'openspace';
        return 'other';
    }
    // look up in accepted sessions for format
    const rec = sessionByTitle[title];
    if (!rec) return 'other';
    const fmt = rec['Session Format'] || '';
    if (fmt.includes('Workshop')) return 'workshop';
    if (fmt.includes('Ignite')) return 'ignite';
    if (fmt.includes('Talk')) return 'talk';
    // fall back: if 45-minute slot at morning → keynote
    return 'keynote';
}

// ─── determine keynotes by scheduled duration ─────────────────────────────────
// 45-minute morning sessions are keynotes
function isKeynote(schedEntry) {
    // compute duration from time string
    const [start, end] = schedEntry.Time.split(' - ');
    function toMins(t) {
        const m = t.match(/(\d+):(\d+)(am|pm)/i);
        if (!m) return 0;
        let h = parseInt(m[1]);
        const min = parseInt(m[2]);
        if (m[3].toLowerCase() === 'pm' && h !== 12) h += 12;
        if (m[3].toLowerCase() === 'am' && h === 12) h = 0;
        return h * 60 + min;
    }
    const dur = toMins(end) - toMins(start);
    const rec = sessionByTitle[schedEntry.Title.trim()];
    if (!rec) return false;
    // keynote = 45-min sessions (or flagged in the Excel as Keynote)
    return dur === 45 ||
        (rec['Session Format'] || '').toLowerCase().includes('keynote');
}

// ─── build the list of program sessions ──────────────────────────────────────
// These are schedule entries that have speakers

const programSchedule = schedule.filter(e => e.Speakers);

// ─── derive speaker IDs ───────────────────────────────────────────────────────

// speaker name → slug ID
function speakerSlug(fullName) {
    return slugify(fullName.trim());
}

// for each program entry, derive primary session slug and speakers list
function deriveSessionId(schedEntry, type) {
    const speakerNames = schedEntry.Speakers.split(',').map(s => s.trim());
    const primary = speakerSlug(speakerNames[0]);
    return `${type}s/${primary}`;
}

// ─── clean old content ────────────────────────────────────────────────────────
console.log('\n=== Cleaning old program content ===');
for (const dir of ['keynotes', 'talks', 'ignites', 'workshops']) {
    rmDir(path.join(ROOT, 'content', 'event', 'program', dir));
    console.log('  cleared', dir);
}

console.log('\n=== Cleaning old speaker content ===');
const speakersDir = path.join(ROOT, 'content', 'event', 'speakers');
if (fs.existsSync(speakersDir)) {
    for (const f of fs.readdirSync(speakersDir)) {
        if (f !== '_index.md') {
            fs.unlinkSync(path.join(speakersDir, f));
        }
    }
}

// ─── collect new speakers & sessions ─────────────────────────────────────────
console.log('\n=== Building new program ===');

const newSessions = [];   // for sessions.json
const newSpeakers = {};   // id → {name, tagline, bio, linkedin, web, image}

// Add schedule-level non-program entries first
const DAY_MAP = { Wed: '2026-05-06', Thu: '2026-05-07' };

// We'll track processed times per day for non-speaker entries
const nonSpeakerMap = {
    'Registration Day 1': { id: 'registration-day1-morning', title: 'Registration & Welcome Coffee', type: 'other', day: '2026-05-06', time: '8:00 - 9:00' },
    'Opening Day1': { id: 'opening-day1-morning', title: 'Opening', type: 'other', day: '2026-05-06', time: '9:00 - 9:15' },
    'Coffee Break Day 1': { id: 'break-day1-morning', title: 'Break', type: 'other', day: '2026-05-06', time: '10:30 - 11:00' },
    'Lunch Day 1': { id: 'lunch-day1', title: 'Lunch', type: 'other', day: '2026-05-06', time: '12:30 - 14:00' },
    "Opening afternoon & Sponsor's speeches": { id: 'opening-day1-afternoon', title: 'Opening Afternoon', type: 'other', day: '2026-05-06', time: '14:00 - 14:10' },
    'Open Space Voting Day 1': { id: 'openspace-voting-day1', title: 'Open Space Voting', type: 'other', day: '2026-05-06', time: '14:45 - 15:15' },
    'Closing the day 1': { id: 'closing-day1', title: 'Closing Day 1', type: 'other', day: '2026-05-06', time: '17:30 - 17:45' },
    'Evening Event': { id: 'evening-event', title: 'Evening Event', type: 'other', day: '2026-05-06', time: '17:45 - 22:00' },
    'Registration Day 2': { id: 'registration-day2-morning', title: 'Registration & Welcome Coffee', type: 'other', day: '2026-05-07', time: '8:00 - 9:00' },
    'Opening Day 2': { id: 'opening-day2-morning', title: 'Opening', type: 'other', day: '2026-05-07', time: '9:00 - 9:15' },
    'Coffee break Day 2': { id: 'break-day2-morning', title: 'Break', type: 'other', day: '2026-05-07', time: '10:30 - 11:00' },
    'Lunch Day 2': { id: 'lunch-day2', title: 'Lunch', type: 'other', day: '2026-05-07', time: '12:30 - 14:00' },
    'Opening Afternoon and Sponsor Pitches': { id: 'opening-day2-afternoon', title: 'Opening Afternoon', type: 'other', day: '2026-05-07', time: '14:00 - 14:10' },
    'Open Space Voting Day 2': { id: 'openspace-voting-day2', title: 'Open Space Voting', type: 'other', day: '2026-05-07', time: '14:45 - 15:15' },
    'Closing Day 2': { id: 'closing-day2', title: 'Raffle & Closing Day 2', type: 'other', day: '2026-05-07', time: '17:30 - 17:45' },
};

// Open spaces
const openSpacesDay1 = { id: 'openspace-track1-day1', title: 'Open Spaces', type: 'openspace', day: '2026-05-06', time: '15:15 - 17:25', speakers: [] };
const openSpacesDay2 = { id: 'openspace-track1-day2', title: 'Open Spaces', type: 'openspace', day: '2026-05-07', time: '15:15 - 17:25', speakers: [] };

// ─── process schedule entries in order ───────────────────────────────────────
let addedOpenSpaceDay1 = false;
let addedOpenSpaceDay2 = false;

for (const entry of schedule) {
    const title = entry.Title.trim();
    const day = DAY_MAP[entry.Day] || '2026-05-06';
    const time = convertTime(entry.Time);

    // non-speaker entries
    if (!entry.Speakers) {
        if (nonSpeakerMap[title]) {
            const s = nonSpeakerMap[title];
            newSessions.push({ id: s.id, title: s.title, type: s.type, day: s.day, time: s.time, speakers: [] });
        }
        // Open space slots - add a combined entry once per day
        if (title.startsWith('Open Space') && !title.includes('Voting')) {
            if (day === '2026-05-06' && !addedOpenSpaceDay1) {
                addedOpenSpaceDay1 = true;
                newSessions.push({ ...openSpacesDay1 });
            }
            if (day === '2026-05-07' && !addedOpenSpaceDay2) {
                addedOpenSpaceDay2 = true;
                newSessions.push({ ...openSpacesDay2 });
            }
        }
        continue;
    }

    // speaker entries
    const rec = sessionByTitle[title];
    if (!rec) {
        console.warn('  WARNING: no accepted session found for:', title);
        continue;
    }

    // determine type
    let type;
    if (isKeynote(entry)) {
        type = 'keynote';
    } else {
        const fmt = rec['Session Format'] || '';
        if (fmt.includes('Workshop')) type = 'workshop';
        else if (fmt.includes('Ignite')) type = 'ignite';
        else type = 'talk';
    }

    // build speaker list
    const speakerNames = entry.Speakers.split(',').map(s => s.trim());
    const speakerIds = speakerNames.map(n => speakerSlug(n));

    // session id
    const primarySlug = speakerIds[0];
    const sessionId = `${type}s/${primarySlug}`;

    // description from accepted sessions (clean up \r\n)
    const description = (rec.Description || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

    // Write session markdown
    const sessionMdPath = path.join(ROOT, 'content', 'event', 'program', `${type}s`, `${primarySlug}.md`);
    const sessionMd = `---
type: "session"
sessionId: "${sessionId}"
---

${description}
`;
    writeFile(sessionMdPath, sessionMd);

    // Add to sessions.json list
    newSessions.push({
        id: sessionId,
        title: title,
        type: type,
        day: day,
        time: time,
        speakers: speakerIds
    });

    // Process speakers - match to accepted speakers via name
    function findSpeaker(name) {
        const slug = speakerSlug(name);
        // first try to match by name in the accepted speakers list
        for (const sp of acceptedSpeakers) {
            const fullName = `${sp.FirstName} ${sp.LastName}`.trim();
            if (speakerSlug(fullName) === slug) return sp;
        }
        // fuzzy: try first name match
        const firstName = name.split(' ')[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        for (const sp of acceptedSpeakers) {
            if (sp.FirstName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').startsWith(firstName.substring(0, 5))) {
                const ln = sp.LastName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const nameParts = slugify(name).split('-');
                if (nameParts.some(p => ln.includes(p) || p.includes(ln.substring(0, 4)))) return sp;
            }
        }
        return null;
    }

    for (let i = 0; i < speakerNames.length; i++) {
        const spName = speakerNames[i];
        const spSlug = speakerIds[i];

        if (newSpeakers[spSlug]) continue; // already processed

        const spRec = findSpeaker(spName);
        if (!spRec) {
            console.warn(`  WARNING: no speaker record found for: ${spName} (slug: ${spSlug})`);
            // Create minimal entry
            newSpeakers[spSlug] = {
                name: spName,
                tagline: '',
                bio: '',
                linkedin: null,
                web: null,
            };
            continue;
        }

        const spFullName = `${spRec.FirstName} ${spRec.LastName}`.trim();
        newSpeakers[spSlug] = {
            name: spFullName,
            tagline: spRec.TagLine || '',
            bio: (spRec.Bio || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim(),
            linkedin: spRec.LinkedIn || null,
            web: spRec.Blog || null,
        };
    }
}

// ─── write speaker markdown files ────────────────────────────────────────────
console.log('\n=== Writing speaker markdown files ===');
for (const [id, sp] of Object.entries(newSpeakers)) {
    const mdPath = path.join(ROOT, 'content', 'event', 'speakers', `${id}.md`);
    const taglineSection = sp.tagline ? `### ${sp.tagline}\n\n` : '';
    const md = `---
title: "${sp.name.replace(/"/g, '\\"')}"
description: "Speaker at DevOpsDays Zurich 2026"
type: "speaker"
speakerId: "${id}"
image: "/images/speakers/${id}.webp"
---

${taglineSection}${sp.bio}
`;
    writeFile(mdPath, md);
}

// ─── write sessions.json ──────────────────────────────────────────────────────
console.log('\n=== Writing data/sessions.json ===');
const sessionsJson = JSON.stringify({ sessions: newSessions }, null, 2);
writeFile(path.join(ROOT, 'data', 'sessions.json'), sessionsJson);

// ─── write speakers.json ──────────────────────────────────────────────────────
console.log('\n=== Writing data/speakers.json ===');
const speakersArr = Object.entries(newSpeakers).map(([id, sp]) => {
    const entry = {
        id,
        name: sp.name,
        image: `/images/speakers/${id}.webp`,
    };
    const social = {};
    if (sp.linkedin) social.linkedin = sp.linkedin;
    if (sp.web) social.web = sp.web;
    if (Object.keys(social).length > 0) entry.social = social;
    return entry;
});
const speakersJson = JSON.stringify({ speakers: speakersArr }, null, 2);
writeFile(path.join(ROOT, 'data', 'speakers.json'), speakersJson);

console.log('\n✓ Done!');
console.log(`  ${Object.keys(newSpeakers).length} speakers`);
console.log(`  ${newSessions.filter(s => s.speakers && s.speakers.length).length} program sessions`);
