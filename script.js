// Get all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Function to save checkbox state to local storage
function saveCheckboxState(checkbox) {
    const checkboxId = checkbox.id;
    const isChecked = checkbox.checked;
    localStorage.setItem(`checkbox-${checkboxId}`, isChecked);
}

// Function to load checkbox state from local storage
function loadCheckboxState(checkbox) {
    const checkboxId = checkbox.id;
    const storedState = localStorage.getItem(`checkbox-${checkboxId}`);
    if (storedState !== null) {
        checkbox.checked = storedState === 'true';
    }
}

// Add event listeners to save checkbox state on change
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function() {
        saveCheckboxState(this);
    });
});

// Load checkbox state from local storage on page load
checkboxes.forEach((checkbox) => {
    loadCheckboxState(checkbox);
});

// Reset tasks function
document.getElementById('resetButton').addEventListener('click', function() {
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    if (allChecked) {
        showConfetti();
    }
    
    // Reset tasks regardless of completion
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        saveCheckboxState(checkbox);
    });
});

// Show confetti falling from the top
function showConfetti() {
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
}

// Create confetti elements with gravity effect
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    confetti.style.backgroundColor = getRandomColor(); // Random color
    confetti.style.width = `${Math.random() * 10 + 5}px`; // Random width
    confetti.style.height = `${Math.random() * 10 + 5}px`; // Random height
    confetti.style.borderRadius = `${Math.random() > 0.5 ? '50%' : '0%'}`; // Randomly round or not
    document.body.appendChild(confetti);
    
    // Animate confetti with gravity effect
    const fallDuration = Math.random() * 2 + 2; // Random fall duration
    confetti.style.animation = `fall ${fallDuration}s forwards`;
    
    setTimeout(() => confetti.remove(), fallDuration * 1000); // Remove confetti after it falls
}

// CSS for confetti animations
const style = document.createElement('style');
style.innerHTML = `
    .confetti {
        position: absolute;
        top: 0;
        opacity: 0.8;
        pointer-events: none;
        transform: translateY(-100%);
        will-change: transform; /* Optimize for animations */
    }

    @keyframes fall {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(100vh) translateX(${Math.random() * 20 - 10}px);
        }
    }
`;
document.head.appendChild(style);

// Get a random color for the confetti
function getRandomColor() {
    const colors = ['#FF5733', '#FFBD33', '#DBFF33', '#75FF33', '#33FF57', '#33FFBD', '#33DBFF', '#3375FF', '#5733FF', '#BD33FF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Load checkbox state from local storage on page load
checkboxes.forEach((checkbox) => {
    loadCheckboxState(checkbox);
});
