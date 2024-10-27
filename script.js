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
