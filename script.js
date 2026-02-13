// Data for all 8 Vibe Steps + 1 Destination Step
const onboardingSteps = [
    { title: "What's your wallet vibe?", subtitle: "No judgment. Just vibes.", icon: "💰", options: [
        { id: 'backpacker', label: 'Backpacker', desc: 'Hostels, street food & stories', emoji: '🎒' },
        { id: 'mid-range', label: 'Mid-range', desc: 'Comfort without the guilt', emoji: '🏨' },
        { id: 'luxury', label: 'Luxury', desc: 'Because you deserve it', emoji: '✨' }
    ]},
    { title: "Mountains or Seas?", subtitle: "The eternal question.", icon: "🌍", options: [
        { id: 'mountains', label: 'Mist-covered Mountains', desc: 'Fog, chai, and silence', emoji: '🏔️' },
        { id: 'seas', label: 'Salt-water Seas', desc: 'Sand, surf, and sunsets', emoji: '🌊' }
    ]},
    { title: "Who's coming along?", subtitle: "Choose your travel party.", icon: "👥", options: [
        { id: 'solo', label: 'Solo', desc: 'Main character energy', emoji: '🚶' },
        { id: 'duo', label: 'Duo', desc: 'Your person + you', emoji: '👫' },
        { id: 'squad', label: 'The Squad', desc: 'Chaos, but the good kind', emoji: '🎉' }
    ]},
    { title: "The Energy Meter", subtitle: "Marathon or nap?", icon: "⚡", options: [
        { id: 'zen', label: 'The "Zen" Pace', desc: '1-2 spots a day, plenty of café time', emoji: '🧘' },
        { id: 'hustler', label: 'The "Hustler" Pace', desc: '5+ spots, early starts', emoji: '🏃' },
        { id: 'balanced', label: 'The "Balanced" Pace', desc: 'A harmonious mix of both', emoji: '⚖️' }
    ]},
    { title: "The Aesthetic Preference", subtitle: "What do you want memories to look like?", icon: "📸", options: [
        { id: 'insta', label: 'Instagrammable', desc: 'Famous viewpoints and pretty cafés', emoji: '📱' },
        { id: 'raw', label: 'Raw & Authentic', desc: 'Crowded markets, messy street food', emoji: '🎞️' },
        { id: 'vintage', label: 'The 90s Vintage', desc: 'Hidden retro theaters, old bookstores', emoji: '📼' }
    ]},
    { title: "Social Comfort Zone", subtitle: "How much do you want to talk?", icon: "🗨️", options: [
        { id: 'introvert', label: 'Introvert Bubble', desc: 'Quiet spots, "don’t look at me" energy', emoji: '😶' },
        { id: 'butterfly', label: 'Social Butterfly', desc: 'Hostels, meetups, skill-swaps', emoji: '🦋' },
        { id: 'local', label: 'Local Immersion', desc: 'Staying with a local family', emoji: '🏠' }
    ]},
    { title: "The Adventure Spectrum", subtitle: "Adrenaline check!", icon: "🎢", options: [
        { id: 'safe', label: 'Safe & Sound', desc: 'Museums, parks, and well-lit areas', emoji: '🏛️' },
        { id: 'spontaneous', label: 'Spontaneous Explorer', desc: 'Show me the path less traveled', emoji: '🗺️' },
        { id: 'thrill', label: 'Thrill Seeker', desc: 'Bungee, night treks, surprise me!', emoji: '🪂' }
    ]},
    { title: "The Foodie Profile", subtitle: "More than just veg or non-veg.", icon: "🍜", options: [
        { id: 'street', label: 'Street Food Crawl', desc: 'Eating standing up on a sidewalk', emoji: '🍲' },
        { id: 'hidden', label: 'Hidden Culinary Gems', desc: 'No signboards, old recipes', emoji: '🥘' },
        { id: 'caffeine', label: 'The Caffeine Hunter', desc: 'Best coffee/tea shops', emoji: '☕' }
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
    if (currentStep === 8) {
        showDestinationScreen();
        return;
    }

    const step = onboardingSteps[currentStep];
    const container = document.getElementById('step-content');
    document.getElementById('step-number').innerText = `${currentStep + 1} / 9`;
    
    container.innerHTML = `
        <div class="vibe-header">
            <span class="globe-icon">${step.icon}</span>
            <h2 class="vibe-title">${step.title}</h2>
            <p class="vibe-subtitle">${step.subtitle}</p>
        </div>
        <div class="options-stack">
            ${step.options.map(opt => `
                <div class="vibe-option" onclick="nextStep('${opt.id}')">
                    <div class="option-content">
                        <span class="option-emoji">${opt.emoji}</span>
                        <div class="option-text"><h3>${opt.label}</h3><p>${opt.desc}</p></div>
                    </div>
                    <div class="radio-circle"></div>
                </div>
            `).join('')}
        </div>
    `;
}

function nextStep(choiceId) {
    console.log(`Step ${currentStep + 1} choice:`, choiceId);
    currentStep++;
    renderStep();
}

function handleStepBack() {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    } else {
        document.getElementById('onboarding-screen').classList.add('hidden');
        document.getElementById('hero-screen').classList.remove('hidden');
    }
}

function showDestinationScreen() {
    document.getElementById('step-number').innerText = `9 / 9`;
    document.getElementById('step-content').innerHTML = `
        <div class="vibe-header">
            <span class="globe-icon">🗺️</span>
            <h2 class="vibe-title">Where to?</h2>
            <p class="vibe-subtitle">Tell us the start and end of your story.</p>
        </div>
        <div class="input-group">
            <input type="text" id="from-loc" placeholder="From — Your starting point">
            <input type="text" id="to-loc" placeholder="To — Your destination">
        </div>
        <button class="auth-btn" onclick="generateItinerary()">Choose Your Path →</button>
    `;
}

function generateItinerary() {
    alert("Serendipity Engine is calculating your path... ✈️");
}

function openAuth() { document.getElementById('auth-modal').classList.remove('hidden'); }
function closeModal() { document.getElementById('auth-modal').classList.add('hidden'); }