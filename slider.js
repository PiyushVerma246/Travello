// Load destinations from JSON and populate the slider
async function loadDestinations() {
    try {
        const response = await fetch('destinations.json');
        const data = await response.json();
        const slider = document.querySelector('.slider.owl-carousel');
        const template = document.getElementById('destination-card-template');

        if (!slider) {
            console.error('Slider element not found');
            return;
        }

        if (!template) {
            console.error('Template element not found');
            return;
        }

        // Clear existing content (except template)
        const existingCards = slider.querySelectorAll('.card');
        existingCards.forEach(card => card.remove());

        // Add each destination as a direct carousel item
        data.destinations.forEach((destination, index) => {
            const card = createDestinationCardFromTemplate(template, destination, index === 0);
            slider.appendChild(card);
        });

        // Reinitialize Owl Carousel after adding content
        if (typeof $ !== 'undefined' && typeof $.fn.owlCarousel !== 'undefined') {
            // Destroy existing carousel if it exists
            if ($(slider).data('owl.carousel')) {
                $(slider).owlCarousel('destroy');
            }
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                initializeOwlCarousel();
            }, 100);
        }
    } catch (error) {
        console.error('Error loading destinations:', error);
    }
}

// Create a destination card from template
function createDestinationCardFromTemplate(template, destination, isFirst = false) {
    // Clone the template content
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.card');

    // Add 'sarak' class to first card
    if (isFirst) {
        card.classList.add('sarak');
    }

    // Populate the card with destination data
    const img = clone.querySelector('.desto');
    img.src = destination.image;
    img.alt = destination.name;

    const off = clone.querySelector('.off');
    off.textContent = destination.offer;

    const price = clone.querySelector('.price');
    price.textContent = destination.price;

    const name = clone.querySelector('p');
    name.textContent = destination.name;

    return clone;
}

// Initialize Owl Carousel
function initializeOwlCarousel() {
    $('.slider').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        margin: 20,
        nav: true,
        dots: true,
        center: false,
        stagePadding: 0,
        responsive: {
            0: {
                items: 1,
                margin: 10
            },
            600: {
                items: 3,
                margin: 15
            },
            1000: {
                items: 6,
                margin: 15
            }
        }
    });
}

// Load destinations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDestinations);
} else {
    loadDestinations();
}
