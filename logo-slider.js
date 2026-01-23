// Load logo slider data from JSON and populate the slider
async function loadLogoSlider() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const slideTrack = document.querySelector('.logo-slider .slide-track');
        const template = document.getElementById('logo-box-template');

        if (!slideTrack) {
            console.error('Logo slider element not found');
            return;
        }

        if (!template) {
            console.error('Logo box template not found');
            return;
        }

        // Create logo boxes from JSON data (duplicate for infinite scroll effect)
        const logoItems = data.logoSlider;

        // Add items twice for seamless infinite scroll
        for (let i = 0; i < 2; i++) {
            logoItems.forEach(item => {
                const logoBox = createLogoBoxFromTemplate(template, item);
                slideTrack.appendChild(logoBox);
            });
        }

    } catch (error) {
        console.error('Error loading logo slider:', error);
    }
}

// Create a logo box from template
function createLogoBoxFromTemplate(template, item) {
    // Clone the template content
    const clone = template.content.cloneNode(true);

    // Populate the cloned content with data
    const img = clone.querySelector('.wonder');
    img.src = item.image;
    img.alt = item.name;

    const quote = clone.querySelector('.logo-quote');
    quote.textContent = item.category;

    // Add spacing breaks
    for (let i = 0; i < 5; i++) {
        quote.appendChild(document.createElement('br'));
    }

    const name = clone.querySelector('.logo-name');
    name.textContent = item.description;

    return clone;
}

// Load logo slider when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadLogoSlider);
} else {
    loadLogoSlider();
}
