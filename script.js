// Open the Modal
function openAuth() {
    document.getElementById('auth-modal').classList.remove('hidden');
}

// Close the Modal
function closeModal() {
    document.getElementById('auth-modal').classList.add('hidden');
}

// Toggle between Login and Signup sections
function toggleAuth(isSignup) {
    const loginSec = document.getElementById('login-section');
    const signupSec = document.getElementById('signup-section');
    
    if (isSignup) {
        loginSec.classList.add('hidden');
        signupSec.classList.remove('hidden');
    } else {
        loginSec.classList.remove('hidden');
        signupSec.classList.add('hidden');
    }
}

// Corrected single handleAuth function
function handleAuth() {
    alert("Welcome to Ullasayathra!");
    closeModal();
    
    // Hide the landing page
    const hero = document.getElementById('hero-screen');
    if (hero) hero.classList.add('hidden');
    
    // Show the vibe check screen
    const vibeScreen = document.getElementById('vibe-check-screen');
    if (vibeScreen) vibeScreen.classList.remove('hidden');
}

function selectVibe(vibe) {
    const options = document.querySelectorAll('.vibe-option');
    options.forEach(opt => opt.classList.remove('active'));
    
    // Highlight the selection
    event.currentTarget.classList.add('active');

    console.log("Selected Vibe:", vibe);
    
    setTimeout(() => {
        alert(`Setting the mood for ${vibe}... Finding Jimin and other friends nearby.`);
    }, 1500); 
}

function goBack() {
    document.getElementById('vibe-check-screen').classList.add('hidden');
    document.getElementById('hero-screen').classList.remove('hidden');
}