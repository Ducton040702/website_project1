// Toggle Light/Dark Mode
document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Validate and Add Signature
function validateForm() {
  let containsErrors = false;
  const inputs = document.querySelectorAll("#sign-petition input");
  const person = {
      name: document.getElementById("name").value.trim(),
      hometown: document.getElementById("hometown").value.trim(),
      email: document.getElementById("email").value.trim()
  };

  inputs.forEach(input => {
      if (input.value.trim().length < 2) {
          input.classList.add("error");
          containsErrors = true;
      } else {
          input.classList.remove("error");
      }
  });

  if (!containsErrors) {
      return person;
  }
  return null;
}

// Add Signature to Support Column
function addSignature(person) {
  if (person && person.name && person.hometown) {
      const newSignature = document.createElement("p");
      newSignature.textContent = `${person.name} from ${person.hometown} supports this.`;
      document.getElementById("supportColumn").appendChild(newSignature);
  }
}

// Modal handling with personalized message
const toggleModal = (person) => {
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("thanks-modal-content");
    const modalImage = document.getElementById("modal-image");
    
    // Ensure the message is set
    modalContent.textContent = `Thank you so much ${person.name} From ${person.hometown} for the signature!`;
    
    // Make sure the modal is displayed - use flex to center it
    modal.style.display = "flex";
    
    // Image animation
    let angle = 0;
    let scaleFactor = 1;
    let growing = false;
    
    const animateImage = () => {
        angle += 10;
        
        if (growing) {
            scaleFactor += 0.1;
            if (scaleFactor >= 1.5) growing = false;
        } else {
            scaleFactor -= 0.1;
            if (scaleFactor <= 0.8) growing = true;
        }
        
        modalImage.style.transform = `rotate(${angle}deg) scale(${scaleFactor})`;
    };
    
    const animationInterval = setInterval(animateImage, 100);
    
    // Auto-close modal after 5 seconds
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(animationInterval);
        modalImage.style.transform = 'none'; // Reset image
    }, 5000);
};

// Submit Petition and Show Modal
const submitPetition = () => {
    const person = validateForm();
    if (person) {
        addSignature(person);
        toggleModal(person);
    } else {
        alert("Please fill out all fields correctly!");
    }
};

// Event Listener for the Sign Button
document.getElementById("signNowButton").addEventListener("click", submitPetition);

// Scroll Animation (Fade Sections)
const fadeSections = () => {
  const sections = document.querySelectorAll('.fade-section');
  const windowHeight = window.innerHeight;
  
  sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      
      // Fade in when section enters view from bottom
      if (sectionTop <= windowHeight * 0.75) {
          section.classList.add('fade-in');
      }
      
      // Fade out when section leaves view by scrolling up
      if (sectionBottom < 0) {
          section.classList.remove('fade-in');
      }
  });
};

// Add scroll and initial page load event listeners
window.addEventListener('scroll', fadeSections);
window.addEventListener('load', fadeSections);