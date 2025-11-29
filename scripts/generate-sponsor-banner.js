#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createCanvas } = require('canvas');

const CONFIG = {
    outputPath: path.join(__dirname, '../static/images/banner/sponsor-banner.jpg'),
    headerPath: path.join(__dirname, '../static/images/banner/banner-header.jpg'),
    sponsorsDataPath: path.join(__dirname, '../data/sponsors.json'),
    sponsorPackagesDataPath: path.join(__dirname, '../data/sponsor_packages.json'),
    sponsorImagesDir: path.join(__dirname, '../static/images/sponsors'),

    // Layout settings
    bannerWidth: 1200,
    headerHeight: 200,
    sectionPadding: 40,
    logoSpacing: 30,
    rowSpacing: 20,
    sectionTitleHeight: 60,
    backgroundColor: '#ffffff',
    textColor: '#333333',
    separatorColor: '#4A90E2',
    separatorHeight: 3,

    // Logo sizes per sponsor level
    logoSizes: {
        gold: { width: 300, height: 120 },
        silver: { width: 250, height: 100 },
        event: { width: 250, height: 100 },
        bronze: { width: 200, height: 80 },
        partner: { width: 180, height: 72 },
        community: { width: 180, height: 72 }
    },

    // Section order (titles will be loaded from sponsor_packages.json)
    sections: [
        { level: 'gold' },
        { level: 'silver' },
        { level: 'event' },
        { level: 'bronze' },
        { level: 'community' },
        { level: 'partner' }
    ]
};

/**
 * Load and parse sponsor packages data
 */
function loadSponsorPackages() {
    const data = JSON.parse(fs.readFileSync(CONFIG.sponsorPackagesDataPath, 'utf8'));
    const levelToName = {};
    data.packages.forEach(pkg => {
        levelToName[pkg.level] = pkg.name;
    });
    return levelToName;
}

/**
 * Load and parse sponsors data
 */
function loadSponsors() {
    const data = JSON.parse(fs.readFileSync(CONFIG.sponsorsDataPath, 'utf8'));
    return data.sponsors;
}

/**
 * Group sponsors by level
 */
function groupSponsorsByLevel(sponsors) {
    const groups = {};
    sponsors.forEach(sponsor => {
        if (!groups[sponsor.level]) {
            groups[sponsor.level] = [];
        }
        groups[sponsor.level].push(sponsor);
    });
    return groups;
}

/**
 * Convert webp/png to a format sharp can process and resize
 */
async function loadAndResizeLogo(logoPath, targetWidth, targetHeight) {
    // Convert web path to file system path
    // logoPath format: /images/sponsors/vshn.webp -> static/images/sponsors/vshn.webp
    const filePath = logoPath.startsWith('/') ? logoPath.substring(1) : logoPath;
    const absolutePath = path.join(__dirname, '..', 'static', filePath);

    if (!fs.existsSync(absolutePath)) {
        console.warn(`Warning: Logo not found at ${absolutePath}`);
        return null;
    }

    try {
        // Load image and resize to fit within bounds while maintaining aspect ratio
        const image = sharp(absolutePath);
        const metadata = await image.metadata();

        // Calculate scaling to fit within target dimensions
        const scale = Math.min(targetWidth / metadata.width, targetHeight / metadata.height);
        const newWidth = Math.round(metadata.width * scale);
        const newHeight = Math.round(metadata.height * scale);

        // Resize and convert to PNG buffer
        const buffer = await image
            .resize(newWidth, newHeight, { fit: 'inside' })
            .png()
            .toBuffer();

        return { buffer, width: newWidth, height: newHeight };
    } catch (error) {
        console.error(`Error processing logo ${absolutePath}:`, error.message);
        return null;
    }
}

/**
 * Create section title with proper text rendering using canvas
 */
async function createSectionTitleImage(text, width) {
    const height = CONFIG.sectionTitleHeight;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = CONFIG.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Draw text with DejaVu Sans (installed system font)
    ctx.fillStyle = CONFIG.textColor;
    ctx.font = 'bold 32px "DejaVu Sans", "Liberation Sans", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    // Convert canvas to buffer
    return canvas.toBuffer('image/png');
}

/**
 * Layout logos in rows with proper spacing
 */
function layoutLogosInRows(logos, maxWidth, logoSpacing) {
    const rows = [];
    let currentRow = [];
    let currentRowWidth = 0;

    for (const logo of logos) {
        const neededWidth = currentRowWidth + logo.width + (currentRow.length > 0 ? logoSpacing : 0);

        if (currentRow.length > 0 && neededWidth > maxWidth) {
            // Start new row
            rows.push(currentRow);
            currentRow = [logo];
            currentRowWidth = logo.width;
        } else {
            currentRow.push(logo);
            currentRowWidth = neededWidth;
        }
    }

    if (currentRow.length > 0) {
        rows.push(currentRow);
    }

    return rows;
}

/**
 * Calculate total height needed for a section
 */
function calculateSectionHeight(logos, maxWidth, logoHeight, logoSpacing, rowSpacing) {
    const rows = layoutLogosInRows(logos, maxWidth, logoSpacing);
    return CONFIG.sectionTitleHeight +
        (rows.length * logoHeight) +
        ((rows.length - 1) * rowSpacing) +
        CONFIG.sectionPadding;
}

/**
 * Generate the sponsor banner
 */
async function generateBanner() {
    console.log('🎨 Generating sponsor banner...');

    // Load sponsors data and package names
    const sponsors = loadSponsors();
    const sponsorsByLevel = groupSponsorsByLevel(sponsors);
    const levelToName = loadSponsorPackages();

    console.log(`📊 Found ${sponsors.length} sponsors across ${Object.keys(sponsorsByLevel).length} levels`);

    // Load header image
    let headerImage;
    let headerHeight = CONFIG.headerHeight;

    if (fs.existsSync(CONFIG.headerPath)) {
        headerImage = await sharp(CONFIG.headerPath).resize(CONFIG.bannerWidth, null, { fit: 'inside' });
        const headerMetadata = await headerImage.metadata();
        headerHeight = headerMetadata.height;
        console.log(`✅ Loaded header image (${CONFIG.bannerWidth}x${headerHeight})`);
    } else {
        console.warn('⚠️  Header image not found, skipping header');
        headerHeight = 0;
    }

    // Process each section
    const sectionComposites = [];
    let currentY = headerHeight;

    for (const section of CONFIG.sections) {
        // Handle both single level and grouped levels (for Event Sponsors)
        const levels = section.levels || [section.level];
        const levelSponsors = [];

        for (const level of levels) {
            if (sponsorsByLevel[level]) {
                levelSponsors.push(...sponsorsByLevel[level]);
            }
        }

        if (levelSponsors.length === 0) {
            continue;
        }

        // Determine section title from sponsor_packages.json
        const sectionTitle = levelToName[levels[0]] || levels[0].charAt(0).toUpperCase() + levels[0].slice(1);

        console.log(`\n📦 Processing ${sectionTitle} (${levelSponsors.length} sponsors)...`);

        // Use the first level's logo size (all event sponsors use same size)
        const logoSize = CONFIG.logoSizes[levels[0]];
        const contentWidth = CONFIG.bannerWidth - (CONFIG.sectionPadding * 2);

        // Load all logos for this section
        const logos = [];
        for (const sponsor of levelSponsors) {
            const logo = await loadAndResizeLogo(sponsor.logo, logoSize.width, logoSize.height);
            if (logo) {
                logos.push(logo);
                console.log(`  ✓ ${sponsor.name}`);
            }
        }

        if (logos.length === 0) {
            console.log(`  ⚠️  No logos loaded for ${sectionTitle}, skipping section`);
            continue;
        }

        // Calculate section height
        const rows = layoutLogosInRows(logos, contentWidth, CONFIG.logoSpacing);
        const sectionHeight = CONFIG.sectionTitleHeight +
            (rows.length * logoSize.height) +
            ((rows.length - 1) * CONFIG.rowSpacing) +
            CONFIG.sectionPadding;

        // Create section background
        const sectionBackground = await sharp({
            create: {
                width: CONFIG.bannerWidth,
                height: sectionHeight,
                channels: 3,
                background: CONFIG.backgroundColor
            }
        }).png().toBuffer();

        // Create section title
        const titleBuffer = await createSectionTitleImage(sectionTitle, CONFIG.bannerWidth);

        // Prepare composites for this section
        const composites = [
            { input: titleBuffer, top: 0, left: 0 }
        ];

        // Layout logos in rows with vertical centering
        let rowY = CONFIG.sectionTitleHeight;
        for (const row of rows) {
            const totalRowWidth = row.reduce((sum, logo) => sum + logo.width, 0) +
                (row.length - 1) * CONFIG.logoSpacing;
            let logoX = CONFIG.sectionPadding + (contentWidth - totalRowWidth) / 2;

            for (const logo of row) {
                // Center logo vertically within the row height
                const verticalOffset = Math.round((logoSize.height - logo.height) / 2);
                composites.push({
                    input: logo.buffer,
                    top: rowY + verticalOffset,
                    left: Math.round(logoX)
                });
                logoX += logo.width + CONFIG.logoSpacing;
            }

            rowY += logoSize.height + CONFIG.rowSpacing;
        }

        // Composite logos onto section
        const sectionImage = await sharp(sectionBackground)
            .composite(composites)
            .png()
            .toBuffer();

        sectionComposites.push({
            input: sectionImage,
            top: currentY,
            left: 0
        });

        currentY += sectionHeight;

        // Add separator line after section (except for the last section)
        const isLastSection = CONFIG.sections.indexOf(section) === CONFIG.sections.length - 1 ||
            CONFIG.sections.slice(CONFIG.sections.indexOf(section) + 1).every(s => {
                const levels = s.levels || [s.level];
                return levels.every(level => !sponsorsByLevel[level] || sponsorsByLevel[level].length === 0);
            });

        if (!isLastSection) {
            const separatorBuffer = await sharp({
                create: {
                    width: CONFIG.bannerWidth,
                    height: CONFIG.separatorHeight,
                    channels: 3,
                    background: CONFIG.separatorColor
                }
            }).png().toBuffer();

            sectionComposites.push({
                input: separatorBuffer,
                top: currentY,
                left: 0
            });

            currentY += CONFIG.separatorHeight;
        }
    }

    // Calculate total banner height
    const totalHeight = currentY;
    console.log(`\n📐 Total banner size: ${CONFIG.bannerWidth}x${totalHeight}`);

    // Create final banner
    const banner = sharp({
        create: {
            width: CONFIG.bannerWidth,
            height: totalHeight,
            channels: 3,
            background: CONFIG.backgroundColor
        }
    });

    // Composite all sections
    const composites = [];

    // Add header if it exists
    if (headerImage) {
        composites.push({
            input: await headerImage.toBuffer(),
            top: 0,
            left: 0
        });
    }

    // Add all sponsor sections
    composites.push(...sectionComposites);

    // Ensure output directory exists
    const outputDir = path.dirname(CONFIG.outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save the final banner
    await banner
        .composite(composites)
        .jpeg({ quality: 90 })
        .toFile(CONFIG.outputPath);

    console.log(`\n✅ Banner generated successfully: ${CONFIG.outputPath}`);
}

// Run the generator
if (require.main === module) {
    generateBanner().catch(err => {
        console.error('❌ Error generating banner:', err);
        process.exit(1);
    });
}

module.exports = { generateBanner };
