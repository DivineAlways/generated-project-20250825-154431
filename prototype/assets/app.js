document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
    try {
        const data = await fetchData();
        populateHero(data.courseInfo);
        populateModules(data.modules);
        populateTestimonials(data.testimonials);
        setupEventListeners();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        // Display error message to the user
        document.body.innerHTML = '<p style="color: red; text-align: center; padding: 2rem;">Error loading course data. Please try again later.</p>';
    }
}

async function fetchData() {
    const response = await fetch('assets/dummy-data.json');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

function populateHero(courseInfo) {
    document.getElementById('hero-title').textContent = courseInfo.title;
    document.getElementById('hero-subtitle').textContent = courseInfo.subtitle;
    document.getElementById('hero-cta').textContent = courseInfo.cta_text;
}

function populateModules(modules) {
    const grid = document.getElementById('modules-grid');
    if (!grid) return;

    const moduleCardsHTML = modules.map(module => `
        <div class="module-card">
            <div class="icon">${module.icon}</div>
            <h3>${module.title}</h3>
            <p>${module.description}</p>
        </div>
    `).join('');

    grid.innerHTML = moduleCardsHTML;
}

function populateTestimonials(testimonials) {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    const testimonialCardsHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <p class="quote">"${testimonial.quote}"</p>
            <div class="author">
                ${testimonial.name}
                <span>${testimonial.platform}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = testimonialCardsHTML;
}

function setupEventListeners() {
    const ctaButtons = document.querySelectorAll('.btn-secondary, .cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // For a prototype, an alert is a simple and effective confirmation.
            alert('Thanks for your interest! You have been added to the waitlist.');
        });
    });
}
