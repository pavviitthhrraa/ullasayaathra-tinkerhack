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

// Handle simulated authentication
function handleAuth() {
    alert("Welcome to Ullasayathra!");
    closeModal();
}

function handleAuth() {
    closeModal();
    // Hide landing, show vibe check
    document.getElementById('hero-screen').classList.add('hidden');
    document.getElementById('vibe-check-screen').classList.remove('hidden');
}

function selectVibe(vibe) {
    // Add active class to the clicked option
    const options = document.querySelectorAll('.vibe-option');
    options.forEach(opt => opt.classList.remove('active'));
    event.currentTarget.classList.add('active');

    console.log("Selected Vibe:", vibe);
    
    // Auto-advance after a short delay
    setTimeout(() => {
        alert(`Setting the mood for ${vibe}... Finding Jimin and other friends nearby.`);
    }, 6000);
}

function goBack() {
    document.getElementById('vibe-check-screen').classList.add('hidden');
    document.getElementById('hero-screen').classList.remove('hidden');
}