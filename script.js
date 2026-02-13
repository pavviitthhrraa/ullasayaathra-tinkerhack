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