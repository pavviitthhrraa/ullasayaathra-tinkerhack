const onboardingSteps = [
    { title: "What's your wallet vibe?", icon: "💰", options: [
        { id: 'backpacker', label: 'Backpacker', desc: 'Hostels, street food & stories', emoji: '🎒' },
        { id: 'mid-range', label: 'Mid-range', desc: 'Comfort without the guilt', emoji: '🏨' },
        { id: 'luxury', label: 'Luxury', desc: 'Because you deserve it', emoji: '✨' }
    ]},
    { title: "Mountains or Seas?", icon: "🌍", options: [
        { id: 'mountains', label: 'Mist-covered Mountains', desc: 'Fog, chai, and silence', emoji: '🏔️' },
        { id: 'seas', label: 'Salt-water Seas', desc: 'Sand, surf, and sunsets', emoji: '🌊' }
    ]},
    { title: "Who's coming along?", icon: "👥", options: [
        { id: 'solo', label: 'Solo', desc: 'Main character energy', emoji: '🚶' },
        { id: 'duo', label: 'Duo', desc: 'Your person + you', emoji: '👫' },
        { id: 'squad', label: 'The Squad', desc: 'Chaos, but the good kind', emoji: '🎉' }
    ]},
    { title: "The Energy Meter", icon: "⚡", options: [
        { id: 'zen', label: 'The "Zen" Pace', desc: '1-2 spots a day', emoji: '🧘' },
        { id: 'hustler', label: 'The "Hustler" Pace', desc: '5+ spots, early starts', emoji: '🏃' },
        { id: 'balanced', label: 'The "Balanced" Pace', desc: 'A harmonious mix', emoji: '⚖️' }
    ]},
    { title: "The Aesthetic Preference", icon: "📸", options: [
        { id: 'insta', label: 'Instagrammable', desc: 'Famous viewpoints', emoji: '📱' },
        { id: 'raw', label: 'Raw & Authentic', desc: 'Crowded markets', emoji: '🎞️' },
        { id: 'vintage', label: 'The 90s Vintage', desc: 'Retro theaters & books', emoji: '📼' }
    ]},
    { title: "Social Comfort Zone", icon: "🗨️", options: [
        { id: 'introvert', label: 'Introvert Bubble', desc: 'Quiet spots', emoji: '😶' },
        { id: 'butterfly', label: 'Social Butterfly', desc: 'Hostels & meetups', emoji: '🦋' },
        { id: 'local', label: 'Local Immersion', desc: 'Stay with a local family', emoji: '🏠' }
    ]},
    { title: "The Adventure Spectrum", icon: "🎢", options: [
        { id: 'safe', label: 'Safe & Sound', desc: 'Museums & parks', emoji: '🏛️' },
        { id: 'spontaneous', label: 'Spontaneous Explorer', desc: 'Path less traveled', emoji: '🗺️' },
        { id: 'thrill', label: 'Thrill Seeker', desc: 'Bungee & night treks', emoji: '🪂' }
    ]},
    { title: "The Foodie Profile", icon: "🍜", options: [
        { id: 'street', label: 'Street Food Crawl', desc: 'Sidewalk eating', emoji: '🍲' },
        { id: 'hidden', label: 'Hidden Culinary Gems', desc: 'Old recipes', emoji: '🥘' },
        { id: 'caffeine', label: 'The Caffeine Hunter', desc: 'Best tea/coffee', emoji: '☕' }
    ]}
];

let currentStep = 0;

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

function nextStep() { currentStep++; renderStep(); }

function showDestinationScreen() {
    document.getElementById('step-number').innerText = "";
    document.getElementById('step-content').innerHTML = `
        <div class="vibe-header">
            <span class="globe-icon">🗺️</span>
            <h2 class="vibe-title">Where to?</h2>
            <p class="vibe-subtitle">Tell us your destination.</p>
        </div>
        <div class="input-group">
            <input type="text" placeholder="From — Your starting point">
            <input type="text" id="dest-input" placeholder="To — e.g. Kochi, Munnar">
        </div>
        <button class="auth-btn" onclick="nextStep()">Choose Your Path →</button>`;
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
    const dest = document.getElementById('dest-input').value.toLowerCase().trim();
    document.getElementById('onboarding-screen').classList.add('hidden');
    document.getElementById('itinerary-screen').classList.remove('hidden');

    try {
        const res = await fetch('data.json');
        const data = await res.json();
        const city = data[dest];

        const header = document.getElementById('itinerary-header');
        const content = document.getElementById('itinerary-content');

        if (city) {
            // Apply the wonderful header styling
            header.innerHTML = `
                <h1 class="itinerary-title">${city.title}</h1>
                <p class="itinerary-meta">Top 5 Spots • Curated for You</p>`;
            
            // Inject the compact cards with peach shadows
            content.innerHTML = city.places.map((p, i) => `
                <div class="place-entry">
                    <span class="place-num">0${i+1}</span>
                    <div class="place-info">
                        <h3>${p.name}</h3>
                        <p>${p.desc}</p>
                    </div>
                </div>`).join('');
            
            document.getElementById('city-map').src = "https://api.mapbox.com/styles/v1/mapbox/light-v10/static/76.5,10.5,9/800x800?access_token=YOUR_TOKEN";
        } else {
            header.innerHTML = `<h1 class="itinerary-title">New Adventure</h1>`;
            content.innerHTML = `<div class="place-entry"><p>Destination not found. Try 'kochi' or 'munnar'!</p></div>`;
        }
    } catch (e) { console.error(e); }
}

function handleStepBack() {
    if (currentStep > 0) { currentStep--; renderStep(); }
    else { document.getElementById('onboarding-screen').classList.add('hidden'); document.getElementById('hero-screen').classList.remove('hidden'); }
}

function openAuth() { document.getElementById('auth-modal').classList.remove('hidden'); }
function closeModal() { document.getElementById('auth-modal').classList.add('hidden'); }
function toggleAuth(isSignup) {
    document.getElementById('login-section').classList.toggle('hidden', isSignup);
    document.getElementById('signup-section').classList.toggle('hidden', !isSignup);
}