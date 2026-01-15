// Interactive Roadmap Logic

// Mock Data
const destinationsData = {
    'paris': {
        spots: [
            { name: 'Eiffel Tower', type: 'Attraction', desc: 'The iconic iron lady of Paris.', img: 'https://images.unsplash.com/photo-1511739001486-91da7fcae391?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Louvre Museum', type: 'Attraction', desc: 'World\'s largest art museum.', img: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=2001&auto=format&fit=crop' },
            { name: 'Montmartre', type: 'District', desc: 'Bohemian neighborhood with views.', img: 'https://images.unsplash.com/photo-1550340499-a61678dc71eb?q=80&w=2080&auto=format&fit=crop' }
        ],
        hotels: [
            { name: 'Hotel Ritz', type: 'Hotel', desc: 'Luxury stay in the heart of Paris.', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Le Marais Boutique', type: 'Hotel', desc: 'Charming and stylish.', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop' }
        ]
    },
    'tokyo': {
        spots: [
            { name: 'Senso-ji Temple', type: 'Attraction', desc: 'Ancient Buddhist temple.', img: 'https://images.unsplash.com/photo-1583067570415-4298fa270830?q=80&w=2076&auto=format&fit=crop' },
            { name: 'Shibuya Crossing', type: 'Attraction', desc: 'Famous busy intersection.', img: 'https://images.unsplash.com/photo-1542051841857-5f906991ddce?q=80&w=2070&auto=format&fit=crop' }
        ],
        hotels: [
            { name: 'Park Hyatt Tokyo', type: 'Hotel', desc: 'Famous luxury with a view.', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Capsule Inn', type: 'Hotel', desc: 'Unique budget experience.', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop' }
        ]
    },
    'goa': {
        spots: [
            { name: 'Baga Beach', type: 'Attraction', desc: 'Popular beach with nightlife.', img: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Fort Aguada', type: 'Attraction', desc: '17th-century Portuguese fort.', img: 'https://images.unsplash.com/photo-1533237264843-0c493696515c?q=80&w=2070&auto=format&fit=crop' }
        ],
        hotels: [
            { name: 'Taj Exotica', type: 'Hotel', desc: '5-star beachfront resort.', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop' },
            { name: 'Goa Cottages', type: 'Hotel', desc: 'Cozy stay near the sea.', img: 'https://images.unsplash.com/photo-1512918760532-3c50e292e4d9?q=80&w=2070&auto=format&fit=crop' }
        ]
    },
    'dubai': {
        spots: [
            { name: 'Burj Khalifa', type: 'Attraction', desc: 'Tallest building in the world.', img: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1974&auto=format&fit=crop' },
            { name: 'Dubai Mall', type: 'Attraction', desc: 'Massive shopping center.', img: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2126&auto=format&fit=crop' }
        ],
        hotels: [
            { name: 'Burj Al Arab', type: 'Hotel', desc: 'Ultra-luxury 7-star hotel.', img: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=2070&auto=format&fit=crop' }
        ]
    }
};

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('destination-input');
const resultsArea = document.getElementById('results-area');
const roadmapItems = document.getElementById('roadmap-items');
const roadmapCount = document.getElementById('roadmap-count');

let myRoadmap = [];

// Search Function
if (searchBtn) {
    searchBtn.addEventListener('click', function () {
        const query = searchInput.value.toLowerCase().trim();

        if (destinationsData[query]) {
            displayResults(destinationsData[query]);
        } else {
            resultsArea.innerHTML = `<p class="placeholder-text">Sorry, we don't have recommendations for "${query}" yet. Try Paris, Tokyo, Goa, or Dubai.</p>`;
        }
    });
}

function displayResults(data) {
    resultsArea.innerHTML = ''; // Clear previous

    // Combine spots and hotels for display
    const allItems = [...data.spots, ...data.hotels];

    allItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'rec-card';
        card.innerHTML = `
            <div class="rec-img-container" style="background-image: url('${item.img}');"></div>
            <div class="rec-details">
                <span class="type">${item.type}</span>
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                <button class="add-btn" onclick="addToRoadmap('${item.name}', '${item.type}')">
                    <i class="fas fa-plus"></i> Add to Roadmap
                </button>
            </div>
        `;
        resultsArea.appendChild(card);
    });
}

// Add to Roadmap Function
window.addToRoadmap = function (name, type) {
    // Check if exists
    if (myRoadmap.find(item => item.name === name)) {
        alert('Item already in your roadmap!');
        return;
    }

    myRoadmap.push({ name, type });
    updateRoadmapUI();
}

// Remove from Roadmap Function
window.removeFromRoadmap = function (name) {
    myRoadmap = myRoadmap.filter(item => item.name !== name);
    updateRoadmapUI();
}

function updateRoadmapUI() {
    roadmapItems.innerHTML = '';
    roadmapCount.innerText = `${myRoadmap.length} Items`;

    if (myRoadmap.length === 0) {
        roadmapItems.innerHTML = `<p class="empty-roadmap">Your roadmap is empty.</p>`;
        return;
    }

    myRoadmap.forEach(item => {
        const div = document.createElement('div');
        div.className = 'rm-item';
        div.innerHTML = `
            <div class="rm-info">
                <h5>${item.name}</h5>
                <span>${item.type}</span>
            </div>
            <i class="fas fa-times rm-remove" onclick="removeFromRoadmap('${item.name}')"></i>
        `;
        roadmapItems.appendChild(div);
    });
}
