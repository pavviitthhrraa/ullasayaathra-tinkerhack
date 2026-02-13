// ... [keep your onboardingSteps array the same] ...

let currentStep = 0;
let savedDestination = ""; // NEW: Global variable to store the 'To' city

function handleAuth() {
    closeModal();
    document.getElementById('hero-screen').classList.add('hidden');
    document.getElementById('onboarding-screen').classList.remove('hidden');
    renderStep();
}

function renderStep() {
    const container = document.getElementById('step-content');
    if (currentStep < 8) {
        const step = onboardingSteps[currentStep];
        document.getElementById('step-number').innerText = `${currentStep + 1} / 8`;
        container.innerHTML = `
            <div class="vibe-header">
                <span class="globe-icon">${step.icon}</span>
                <h2 class="vibe-title">${step.title}</h2>
            </div>
            <div class="options-stack">
                ${step.options.map(opt => `
                    <div class="vibe-option" onclick="nextStep()">
                        <div class="option-content">
                            <span class="option-emoji">${opt.emoji}</span>
                            <div class="option-text"><h3>${opt.label}</h3><p>${opt.desc}</p></div>
                        </div>
                    </div>`).join('')}
            </div>`;
    } else if (currentStep === 8) {
        showDestinationScreen();
    } else {
        showPathChoiceScreen();
    }
}

// UPDATED: Saves the input before moving to the choice screen
function nextStep() { 
    if (currentStep === 8) {
        const input = document.getElementById('dest-input');
        savedDestination = input ? input.value.toLowerCase().trim() : "";
        console.log("Destination Saved:", savedDestination);
    }
    currentStep++; 
    renderStep(); 
}

function showDestinationScreen() {
    document.getElementById('step-number').innerText = "";
    document.getElementById('step-content').innerHTML = `
        <div class="vibe-header">
            <span class="globe-icon">🗺️</span>
            <h2 class="vibe-title">Where to?</h2>
            <p class="vibe-subtitle">Tell us the start and end of your story.</p>
        </div>
        <div class="input-group">
            <input type="text" placeholder="From — Starting point">
            <input type="text" id="dest-input" placeholder="To — e.g. Kochi, Munnar">
        </div>
        <button class="auth-btn" style="margin-top: 20px;" onclick="nextStep()">Choose Your Path →</button>
    `;
}

function showPathChoiceScreen() {
    document.getElementById('step-content').innerHTML = `
        <div class="vibe-header">
            <span class="globe-icon">🛤️</span>
            <h2 class="vibe-title">Choose Your Path</h2>
            <p class="vibe-subtitle">How do you want to experience your trip?</p>
        </div>
        <div class="path-options">
            <div class="path-card" onclick="generateItinerary()">
                <span class="emoji">📋</span>
                <h3>The Normal Plan</h3>
                <p>Full itinerary upfront. Classic and reliable.</p>
            </div>
            <div class="path-card surprise" onclick="alert('Mystery Mode Locked')">
                <span class="emoji">🎴</span>
                <h3>The Ottamind Plan</h3>
                <p>Only Day 1 revealed. Unlock the rest by exploring.</p>
            </div>
        </div>`;
}

async function generateItinerary() {
    // 1. USE THE SAVED VARIABLE (not the dead input field)
    const dest = savedDestination;
    
    const locations = {
        "kochi": { lat: 9.9312, lon: 76.2673, bbox: "76.15,9.85,76.40,10.05" },
        "munnar": { lat: 10.0889, lon: 77.0595, bbox: "77.00,10.00,77.15,10.15" },
        "varkala": { lat: 8.7331, lon: 76.7063, bbox: "76.65,8.68,76.75,8.78" },
        "alleppey": { lat: 9.4981, lon: 76.3388, bbox: "76.28,9.45,76.40,9.55" }
    };

    document.getElementById('onboarding-screen').classList.add('hidden');
    document.getElementById('itinerary-screen').classList.remove('hidden');

    try {
        const res = await fetch('data.json');
        const data = await res.json();
        const city = data[dest];

        const header = document.getElementById('itinerary-header');
        const content = document.getElementById('itinerary-content');
        const mapFrame = document.getElementById('osm-map');

        if (city) {
            header.innerHTML = `
                <h1 class="itinerary-title">${city.title}</h1>
                <p class="itinerary-meta">Top 5 Spots • Curated for You</p>`;
            
            content.innerHTML = city.places.map((p, i) => `
                <div class="place-entry">
                    <span class="place-num">0${i+1}</span>
                    <div class="place-info">
                        <h3>${p.name}</h3>
                        <p>${p.desc}</p>
                    </div>
                </div>`).join('');
            
            const loc = locations[dest] || { lat: 10.8505, lon: 76.2711, bbox: "76.15,9.85,76.40,10.05" };
            mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${loc.bbox}&layer=mapnik&marker=${loc.lat}%2C${loc.lon}`;
            
        } else {
            header.innerHTML = `<h1 class="itinerary-title">New Adventure</h1>`;
            content.innerHTML = `<div class="place-entry"><p>Destination "${dest}" not found in data.json. Try 'kochi' or 'munnar'!</p></div>`;
        }
    } catch (e) { 
        console.error("JSON Error:", e);
        alert("Failed to load data.json. Check the console for details.");
    }
}

// ... [keep handleStepBack, openAuth, closeModal, toggleAuth the same] ...