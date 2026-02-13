const onboardingSteps = [
    { title: "What's your wallet vibe?", icon: "💰", options: [
        { id: 'backpacker', label: 'Backpacker', desc: 'Hostels & street food', emoji: '🎒' },
        { id: 'mid-range', label: 'Mid-range', desc: 'Comfort without guilt', emoji: '🏨' },
        { id: 'luxury', label: 'Luxury', desc: 'Because you deserve it', emoji: '✨' }
    ]},
    { title: "Mountains or Seas?", icon: "🌍", options: [
        { id: 'mountains', label: 'Mountains', desc: 'Fog, chai, and silence', emoji: '🏔️' },
        { id: 'seas', label: 'Seas', desc: 'Sand, surf, and sunsets', emoji: '🌊' }
    ]},
    { title: "Who's coming along?", icon: "👥", options: [
        { id: 'solo', label: 'Solo', desc: 'Main character energy', emoji: '🚶' },
        { id: 'duo', label: 'Duo', desc: 'Your person + you', emoji: '👫' },
        { id: 'squad', label: 'The Squad', desc: 'Chaos, but the good kind', emoji: '🎉' }
    ]},
    { title: "The Energy Meter", icon: "⚡", options: [
        { id: 'zen', label: 'The "Zen" Pace', desc: '1-2 spots a day', emoji: '🧘' },
        { id: 'hustler', label: 'The "Hustler" Pace', desc: '5+ spots, early starts', emoji: '🏃' },
        { id: 'balanced', label: 'The "Balanced" Pace', desc: 'A mix of both', emoji: '⚖️' }
    ]},
    { title: "The Aesthetic Preference", icon: "📸", options: [
        { id: 'insta', label: 'Instagrammable', desc: 'Pretty cafes & viewpoints', emoji: '📱' },
        { id: 'raw', label: 'Raw & Authentic', desc: 'Markets & street food', emoji: '🎞️' },
        { id: 'vintage', label: 'The 90s Vintage', desc: 'Retro film vibes', emoji: '📼' }
    ]},
    { title: "Social Comfort Zone", icon: "🗨️", options: [
        { id: 'introvert', label: 'Introvert Bubble', desc: 'Quiet spots', emoji: '😶' },
        { id: 'butterfly', label: 'Social Butterfly', desc: 'Meetups & hostels', emoji: '🦋' },
        { id: 'local', label: 'Local Immersion', desc: 'Stay with a family', emoji: '🏠' }
    ]},
    { title: "The Adventure Spectrum", icon: "🎢", options: [
        { id: 'safe', label: 'Safe & Sound', desc: 'Museums & parks', emoji: '🏛️' },
        { id: 'spontaneous', label: 'Spontaneous', desc: 'Path less traveled', emoji: '🗺️' },
        { id: 'thrill', label: 'Thrill Seeker', desc: 'Night treks & bungee', emoji: '🪂' }
    ]},
    { title: "The Foodie Profile", icon: "🍜", options: [
        { id: 'street', label: 'Street Food Crawl', desc: 'Eating on the sidewalk', emoji: '🍲' },
        { id: 'hidden', label: 'Hidden Gems', desc: 'Old family recipes', emoji: '🥘' },
        { id: 'caffeine', label: 'Caffeine Hunter', desc: 'Best coffee/tea shops', emoji: '☕' }
    ]}
];

let currentStep = 0;

function openAuth() { document.getElementById('auth-modal').classList.remove('hidden'); }
function closeModal() { document.getElementById('auth-modal').classList.add('hidden'); }
function toggleAuth(isSignup) {
    document.getElementById('login-section').classList.toggle('hidden', isSignup);
    document.getElementById('signup-section').classList.toggle('hidden', !isSignup);
}

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
            <div class="vibe-header"><span class="globe-icon">${step.icon}</span><h2 class="vibe-title">${step.title}</h2></div>
            <div class="options-stack">
                ${step.options.map(opt => `
                    <div class="vibe-option" onclick="nextStep()">
                        <div class="option-content">
                            <span class="option-emoji">${opt.emoji}</span>
                            <div class="option-text"><h3>${opt.label}</h3><p>${opt.desc}</p></div>
                        </div>
                        <div class="radio-circle"></div>
                    </div>`).join('')}
            </div>`;
    } else if (currentStep === 8) {
        showDestinationScreen();
    } else if (currentStep === 9) {
        showPathChoiceScreen();
    }
}

function nextStep() { currentStep++; renderStep(); }

function handleStepBack() {
    if (currentStep > 0) { currentStep--; renderStep(); }
    else { document.getElementById('onboarding-screen').classList.add('hidden'); document.getElementById('hero-screen').classList.remove('hidden'); }
}

function showDestinationScreen() {
    document.getElementById('step-number').innerText = "";
    document.getElementById('step-content').innerHTML = `
        <div class="vibe-header"><span class="globe-icon">🗺️</span><h2 class="vibe-title">Where to?</h2></div>
        <div class="input-group">
            <input type="text" id="to-loc" placeholder="To — e.g. Kochi, Munnar, Varkala">
        </div>
        <button class="auth-btn" style="margin-top:20px" onclick="nextStep()">Choose Your Path →</button>`;
}

function showPathChoiceScreen() {
    document.getElementById('step-content').innerHTML = `
        <div class="vibe-header"><span class="globe-icon">🛤️</span><h2 class="vibe-title">Choose Your Path</h2></div>
        <div class="path-options">
            <div class="path-card" onclick="generateItinerary()">📋 <h3>Normal Plan</h3><p>Full itinerary upfront.</p></div>
            <div class="path-card surprise" onclick="generateItinerary()">🎴 <h3>Ottamind Plan</h3><p>Mystery mode active!</p></div>
        </div>`;
}

async function generateItinerary() {
    const destination = document.getElementById('to-loc').value.toLowerCase().trim();
    document.getElementById('onboarding-screen').classList.add('hidden');
    document.getElementById('itinerary-screen').classList.remove('hidden');

    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const city = data[destination];
        const header = document.getElementById('itinerary-header');
        const content = document.getElementById('itinerary-content');

        if (city) {
            header.innerHTML = `<h1 class="itinerary-title">${city.title}</h1><p class="itinerary-meta">${city.meta}</p>`;
            content.innerHTML = city.places.map((p, i) => `
                <div class="place-entry"><span>0${i+1}</span><h3>${p.name}</h3><p>${p.desc}</p></div>`).join('');
        } else {
            header.innerHTML = `<h1 class="itinerary-title">Searching...</h1>`;
            content.innerHTML = `<p class="vibe-subtitle">Try 'Kochi' or 'Munnar' for the demo!</p>`;
        }
    } catch (e) { console.error(e); }
}