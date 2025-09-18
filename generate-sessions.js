#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read sessions data
const sessionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/sessions.json'), 'utf8'));

// Template content for different session types
const templates = {
    talk: {
        abstract: "This presentation explores key concepts and practical applications that will help you advance your understanding and implementation of modern practices.",
        learningOutcomes: "- Key concepts and practical applications\n- Real-world implementation strategies\n- Best practices and common pitfalls\n- Actionable insights for immediate application",
        takeaways: "You'll leave with a deeper understanding of the topic and practical knowledge you can apply in your own projects and organizations."
    },
    ignite: {
        abstract: "This fast-paced 5-minute ignite talk delivers maximum impact with key insights and actionable takeaways you can implement immediately.",
        learningOutcomes: "- Core concepts delivered at lightning speed\n- Practical insights for immediate application\n- Key takeaways that matter most\n- Inspiration for further exploration",
        takeaways: "In just 5 minutes, you'll gain valuable insights and actionable ideas to take back to your team."
    },
    workshop: {
        abstract: "This hands-on workshop provides practical experience and in-depth knowledge through interactive exercises and real-world scenarios.",
        learningOutcomes: "- Hands-on practical experience\n- In-depth understanding of key concepts\n- Real-world application scenarios\n- Tools and techniques for immediate implementation",
        takeaways: "You'll leave with practical skills, proven techniques, and the confidence to implement what you've learned in your own environment."
    }
};

// Sessions that already have detail pages created
const existingSessions = [
    'talks/marc-schuh',
    'talks/lena-fuhrimann',
    'talks/christina-kraus',
    'ignites/carmine-vassallo',
    'ignites/marc-sallin',
    'workshops/domain-driven-refactoring',
    'workshops/secure-containers'
];

// Generate content for each session that has speakers
sessionsData.sessions.forEach(session => {
    // Skip sessions without speakers or existing sessions
    if (!session.speakers || session.speakers.length === 0 || existingSessions.includes(session.id)) {
        return;
    }

    const sessionType = session.type;
    const template = templates[sessionType];

    if (!template) {
        console.log(`Skipping ${session.id} - no template for type: ${sessionType}`);
        return;
    }

    const content = `---
title: "${session.title}"
description: "${session.title} - DevOpsDays Zurich 2025"
type: "session"
sessionId: "${session.id}"
---

${template.abstract}

## Abstract

Join us for this ${sessionType === 'ignite' ? 'energizing ignite talk' : sessionType === 'workshop' ? 'comprehensive workshop' : 'insightful presentation'} that covers essential concepts and provides practical value for attendees.

## What You'll Learn

${template.learningOutcomes}

## Key Topics

- Understanding core principles and concepts
- Practical implementation strategies
- Real-world examples and case studies
- Best practices and lessons learned
- Common challenges and how to overcome them

${sessionType === 'workshop' ? `## Workshop Format

This interactive workshop includes:

- **Hands-on Exercises**: Practical labs and activities
- **Group Discussions**: Collaborative learning and knowledge sharing  
- **Real-world Scenarios**: Apply concepts to actual use cases
- **Take-home Resources**: Materials to continue learning after the event

## Prerequisites

- Basic understanding of relevant technologies
- Laptop with necessary development tools
- Willingness to participate in hands-on activities

## Materials Provided

- Workshop exercises and solutions
- Reference documentation and resources
- Access to tools and platforms used during the session
` : ''}

## Key Takeaways

${template.takeaways}

${sessionType === 'ignite' ? `## Ignite Format

This presentation follows the ignite format:
- **5 minutes total**
- **20 slides** that auto-advance every 15 seconds
- **Fast-paced** and highly engaging
- **Focused** on the most important insights
` : ''}

## Who Should Attend

This ${sessionType} is perfect for:
- Developers and engineers looking to expand their knowledge
- Technical leads and architects planning implementations
- DevOps professionals seeking practical insights
- Anyone interested in modern software development practices

*Don't miss this opportunity to learn from industry experts and expand your technical knowledge!*`;

    const fileName = `${session.id}.md`;

    // Determine the correct subfolder path
    let subFolder = '';
    if (session.id.startsWith('talks/')) {
        subFolder = session.id.replace('talks/', '');
        fileName = `${subFolder}.md`;
        filePath = path.join(__dirname, 'content/sessions/talks', fileName);
    } else if (session.id.startsWith('ignites/')) {
        subFolder = session.id.replace('ignites/', '');
        fileName = `${subFolder}.md`;
        filePath = path.join(__dirname, 'content/sessions/ignites', fileName);
    } else if (session.id.startsWith('workshops/')) {
        subFolder = session.id.replace('workshops/', '');
        fileName = `${subFolder}.md`;
        filePath = path.join(__dirname, 'content/sessions/workshops', fileName);
    } else {
        fileName = `${session.id}.md`;
        filePath = path.join(__dirname, 'content/sessions', fileName);
    }

    try {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Created: ${fileName}`);
    } catch (error) {
        console.error(`❌ Error creating ${fileName}:`, error.message);
    }
});

console.log('\\n✨ Session detail pages generation complete!');
