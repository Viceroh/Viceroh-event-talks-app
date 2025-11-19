const fs = require('fs');
const path = require('path');

const talks = [
    {
        title: "The Future of AI in Software Development",
        speakers: ["Dr. Evelyn Reed"],
        categories: ["AI", "Development", "Future Tech"],
        duration: 60,
        description: "A deep dive into how artificial intelligence is reshaping the landscape of software engineering, from automated code generation to intelligent testing."
    },
    {
        title: "Building Scalable Web Applications with Micro-frontends",
        speakers: ["John Doe", "Jane Smith"],
        categories: ["Web", "Architecture", "Frontend"],
        duration: 60,
        description: "Explore the micro-frontends architecture, its benefits for large-scale projects, and best practices for implementation."
    },
    {
        title: "Cybersecurity in the Age of IoT",
        speakers: ["Alex Chen"],
        categories: ["Security", "IoT"],
        duration: 60,
        description: "With billions of connected devices, what are the new security challenges and how can we build a more secure IoT ecosystem?"
    },
    {
        title: "The Power of Declarative UIs with Modern Frontend Frameworks",
        speakers: ["Maria Garcia"],
        categories: ["Web", "Frontend", "UI/UX"],
        duration: 60,
        description: "An overview of how modern frameworks like React, Vue, and Svelte leverage declarative patterns to build powerful and maintainable user interfaces."
    },
    {
        title: "Navigating the Cloud-Native Landscape",
        speakers: ["Bamidele Adebayo"],
        categories: ["Cloud", "DevOps", "Architecture"],
        duration: 60,
        description: "From containers to serverless, this talk will guide you through the cloud-native ecosystem and help you choose the right tools for your needs."
    },
    {
        title: "Ethical Considerations in Machine Learning",
        speakers: ["Kenji Tanaka", "Fatima Al-Jamil"],
        categories: ["AI", "Ethics"],
        duration: 60,
        description: "A critical discussion on the ethical implications of machine learning, including bias in algorithms and the societal impact of AI."
    }
];

function generateSchedule(talks) {
    let startTime = new Date();
    startTime.setHours(10, 0, 0, 0);
    const schedule = [];

    function formatTime(date) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    talks.forEach((talk, index) => {
        const endTime = new Date(startTime.getTime() + talk.duration * 60000);
        schedule.push({ ...talk, time: `${formatTime(startTime)} - ${formatTime(endTime)}` });

        if (index === 2) { // Lunch break after the 3rd talk
            startTime = new Date(endTime.getTime() + 60 * 60000);
            schedule.push({ title: "Lunch Break", time: `${formatTime(endTime)} - ${formatTime(startTime)}`, isBreak: true });
        } else if (index < talks.length - 1) { // 10-minute break between other talks
            startTime = new Date(endTime.getTime() + 10 * 60000);
        }
    });

    return schedule;
}

const schedule = generateSchedule(talks);

function generateHtml(schedule) {
    let scheduleHtml = '';
    schedule.forEach(item => {
        if (item.isBreak) {
            scheduleHtml += `<div class="schedule-item break"><strong>${item.title}</strong><div class="time">${item.time}</div></div>`;
        } else {
            scheduleHtml += `
                <div class="schedule-item">
                    <h2>${item.title}</h2>
                    <div class="time">${item.time}</div>
                    <div class="speakers">By: ${item.speakers.join(', ')}</div>
                    <div class="categories">
                        ${item.categories.map(cat => `<span class="category">${cat}</span>`).join('')}
                    </div>
                    <p>${item.description}</p>
                </div>
            `;
        }
    });
    return scheduleHtml;
}

const htmlTemplate = fs.readFileSync(path.join(__dirname, 'src', 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'src', 'style.css'), 'utf8');
const script = fs.readFileSync(path.join(__dirname, 'src', 'script.js'), 'utf8');

const scheduleHtml = generateHtml(schedule);

let finalHtml = htmlTemplate.replace('/* CSS will be injected here */', css);
finalHtml = finalHtml.replace('<!-- Schedule will be injected here -->', scheduleHtml);
finalHtml = finalHtml.replace('// Talk data and script will be injected here', script);

fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), finalHtml);

console.log('Website generated successfully in dist/index.html');
