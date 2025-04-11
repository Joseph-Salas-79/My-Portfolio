document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const verificationStatus = document.querySelector('.verification-status');
  const verificationMessage = document.querySelector('.verification-message');
  const verificationSuccess = document.querySelector('.verification-success');
  const verificationFail = document.querySelector('.verification-fail');
  let verificationTimeout;
  let isVerified = false;

  // Initial verification
  startVerification();

  function startVerification() {
    resetVerificationUI();
    verificationTimeout = setTimeout(() => {
      checkScreenSize();
    }, 1500);
  }

  function checkScreenSize() {
    const isValid = window.innerWidth >= 1200;
    finishVerification(isValid);
  }

  function finishVerification(isValid) {
    clearTimeout(verificationTimeout);
    const animation = document.querySelector('.verification-animation');
    const text = document.querySelector('.verification-text');

    animation.style.opacity = '0';
    text.style.opacity = '0';

    setTimeout(() => {
      animation.style.display = 'none';
      text.style.display = 'none';

      if(isValid) {
        verificationSuccess.style.display = 'block';
        verificationSuccess.style.animation = 'fadeIn 1s ease forwards, pulse 1s ease infinite';
        isVerified = true;
        setTimeout(loadMainContent, 1000);
      } else {
        verificationFail.style.display = 'block';
        isVerified = false;
      }
    }, 300);
  }

  function resetVerificationUI() {
    const animation = document.querySelector('.verification-animation');
    const text = document.querySelector('.verification-text');
    
    animation.style.display = 'block';
    animation.style.opacity = '1';
    text.style.display = 'block';
    text.style.opacity = '1';
    verificationSuccess.style.display = 'none';
    verificationFail.style.display = 'none';
  }

  function loadMainContent() {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      document.querySelector('.container').style.display = 'block';
      document.querySelector('.nav').style.display = 'block';
    }, 500);
  }

  // Handle screen resize
  window.addEventListener('resize', function() {
    if(isVerified && window.innerWidth >= 1200) {
      return; // Don't re-verify if already valid
    }
    
    if(loadingScreen.style.display === 'none') {
      loadingScreen.style.display = 'flex';
      loadingScreen.style.opacity = '1';
      document.querySelector('.container').style.display = 'none';
      document.querySelector('.nav').style.display = 'none';
    }
    
    clearTimeout(verificationTimeout);
    resetVerificationUI();
    startVerification();
  });
});

function updateGreeting() {
  const times = document.querySelectorAll('.greeting-time');
  if (!times.length) return;

  // FOR TESTING - Uncomment one of these to force a specific time:
  // const hour = 9;   // Force Morning (9am)
  // const hour = 14;  // Force Afternoon (2pm)
  const hour = 20;    // Force Evening (8pm)
  
  // Or use actual time (comment out the line above when done testing)
  // const hour = new Date().getHours();
  
  let activeIndex = 0;
  if (hour < 12) {
    activeIndex = 0; // Morning
  } else if (hour < 18) {
    activeIndex = 1; // Afternoon
  } else {
    activeIndex = 2; // Evening
  }

  times.forEach((time, index) => {
    const yPos = (index - activeIndex) * 100;
    time.style.transform = `translateY(${yPos}%)`;
  });
}

const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');

const resumeLists = document.querySelectorAll('.resume-list');
const resumeBoxs = document.querySelectorAll('.resume-box');

const additionalLists = document.querySelectorAll('.additional-list');
const additionalBoxs = document.querySelectorAll('.additional-box');

const form = document.getElementById('contactForm');
const responseMessage = document.getElementById('responseMessage');
const popupMessage = document.getElementById('popupMessage');

const cursor = document.createElement('span');
const descElements = document.querySelectorAll('.desc');

// Nav Text
document.addEventListener('DOMContentLoaded', function() {
  const navText = document.querySelector('.nav-text');
  const originalText = "Go through this box to see more about me";
  
  // Clear existing content
  navText.innerHTML = '';
  
  // Create spans for each character
  originalText.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.setAttribute('data-char', char);
      span.style.setProperty('--char-index', index);
      navText.appendChild(span);
  });
});

// const lastActivePage = localStorage.getItem('lastActivePage');

// Typed.js Initialization
// const typed = new Typed('.typing-text', {
//   strings: ['a Teacher', 'a Youtuber', 'an Advanced Premier Pro Editor', 'an Advanced Photoshop Editor', 'a Web Designer', 'Adaptive to Technology'], // Text to type
//   typeSpeed: 100, // Typing speed in milliseconds
//   backSpeed: 50, // Backspacing speed in milliseconds
//   backDelay: 1000, // Delay before backspacing
//   loop: true, // Loop the animation
// });

// Desc styles

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all add buttons
  setupAddButtons();
  
  // Set up delete button functionality
  document.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-btn')) {
          e.target.parentElement.remove();
          checkEmptyStates();
      }
  });
});

// Function to set up all add buttons
function setupAddButtons() {
  // Add buttons for experience, education, org, lang
  document.querySelectorAll('.add-item-btn:not([data-skill-type])').forEach(btn => {
      btn.addEventListener('click', function() {
          const sectionType = this.getAttribute('data-section');
          addNewItem(sectionType);
      });
  });
  
  // Special handling for skills (software and general)
  document.querySelectorAll('.add-item-btn[data-skill-type]').forEach(btn => {
      btn.addEventListener('click', function() {
          const sectionType = 'skills';
          const skillType = this.getAttribute('data-skill-type');
          addNewItem(sectionType, skillType);
      });
  });
}

// Function to add new item to a section
function addNewItem(sectionType, skillType = null) {
  let container;
  let newItemHtml;
  const newId = `${sectionType}-${Date.now()}`;
  
  // Determine where to add the new item
  if (sectionType === 'skills' && skillType) {
      container = document.querySelector(`.${skillType}-skill-progress`);
  } else {
      container = document.querySelector(`.resume-box.${sectionType}, .additional-box.${sectionType}`);
  }
  
  // Create the appropriate HTML template
  switch(sectionType) {
      case 'experience':
          newItemHtml = `
              <div class="tab-item resume-item edit-mode" data-editable id="${newId}">
                  <h4 contenteditable="true">2023 - Present</h4>
                  <h4 contenteditable="true">Your Position</h4>
                  <h4 contenteditable="true">Company Name</h4>
                  <p class="leader" contenteditable="true"><span class="leader-hilight">Head of Institute: </span>Supervisor Name</p>
                  <button class="delete-btn">×</button>
              </div>
          `;
          break;
          
      case 'education':
          newItemHtml = `
              <div class="tab-item resume-item edit-mode" data-editable id="${newId}">
                  <h4 contenteditable="true">2020 - 2024</h4>
                  <h4 contenteditable="true">Degree Name</h4>
                  <h4 contenteditable="true">University Name</h4>
                  <button class="delete-btn">×</button>
              </div>
          `;
          break;
          
      case 'skills':
          const iconClass = skillType === 'software' ? 'bx bx-code-alt' : 'bx bx-check';
          newItemHtml = `
              <div class="tab-item resume-item edit-mode" data-editable id="${newId}">
                  <div class="${skillType}-skill-icon ${skillType}-icon">
                      <h4 contenteditable="true">${skillType === 'software' ? 'Programming Language' : 'General Skill'}</h4>
                      <div class="skill-icon"><i class='${iconClass}'></i></div>
                  </div>
                  <div class="loading-bar-container" data-value="50" data-max="100">
                      <div class="loading-bar-progress">
                          <div class="loading-bar-shine"></div>
                          <span class="loading-bar-text">50%</span>
                      </div>
                  </div>
                  <button class="delete-btn">×</button>
              </div>
          `;
          break;
          
      case 'org':
          newItemHtml = `
              <div class="additional-item edit-mode" data-editable id="${newId}">
                  <div class="org-logo">
                      <img src="placeholder-logo.png" alt="Organization Logo">
                  </div>
                  <div class="org-header">
                      <h4 contenteditable="true">Organization Name</h4>
                      <a href="#" target="_blank" rel="noopener noreferrer" class="external-link">
                          <i class='bx bx-link-external'></i>
                      </a>
                  </div>
                  <p contenteditable="true">Organization description goes here...</p>
                  <button class="delete-btn">×</button>
              </div>
          `;
          break;
          
      case 'lang':
          newItemHtml = `
              <div class="tab-item additional-item edit-mode" data-editable id="${newId}">
                  <h4 contenteditable="true">Language Name</h4>
                  <div class="loading-bar-container" data-value="50" data-max="100">
                      <div class="loading-bar-progress">
                          <div class="loading-bar-shine"></div>
                          <span class="loading-bar-text">50%</span>
                      </div>
                  </div>
                  <button class="delete-btn">×</button>
              </div>
          `;
          break;
  }
  
  // Find the add button container and insert before it
  const addButtonContainer = container.querySelector('.add-item-container');
  if (addButtonContainer) {
      addButtonContainer.insertAdjacentHTML('beforebegin', newItemHtml);
  } else {
      // If no add button container, append to the end
      container.insertAdjacentHTML('beforeend', newItemHtml);
  }
  
  // Initialize loading bars if needed
  if (sectionType === 'skills' || sectionType === 'lang') {
      initLoadingBars();
  }
  
  // Focus on the first editable element
  const firstEditable = document.getElementById(newId).querySelector('[contenteditable="true"]');
  if (firstEditable) {
      firstEditable.focus();
  }
}

// Initialize loading bars (for skills and languages)
function initLoadingBars() {
  document.querySelectorAll('.loading-bar-container').forEach(container => {
      const value = parseFloat(container.getAttribute('data-value')) || 50;
      const max = parseFloat(container.getAttribute('data-max')) || 100;
      const percentage = Math.min((value / max) * 100, 100);
      
      const progressBar = container.querySelector('.loading-bar-progress');
      const textElement = container.querySelector('.loading-bar-text');
      
      if (progressBar) progressBar.style.width = `${percentage}%`;
      if (textElement) textElement.textContent = `${Math.round(percentage)}%`;
  });
}

// Check empty states (optional - you can implement this if needed)
function checkEmptyStates() {
  // Implement logic to show/hide empty state messages if needed
}

// Visitor Mdodule
// Global variable to track admin status
let isAdmin = false;

document.addEventListener('DOMContentLoaded', function() {
    // Check admin status (you'll need to implement your actual admin check)
    checkAdminStatus();
    
    // Initialize all add buttons
    setupAddButtons();
    
    // Set up delete button functionality (only for admin)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            if (!isAdmin) {
                showVisitorModal();
                return;
            }
            e.target.parentElement.remove();
            checkEmptyStates();
        }
    });
});

// Function to check admin status (replace with your actual admin check)
function checkAdminStatus() {
    // This should be replaced with your actual admin authentication check
    // For example, check sessionStorage or cookies
    isAdmin = sessionStorage.getItem('adminAuthenticated') === 'true';
}

// Function to show visitor modal
function showVisitorModal() {
    const modal = document.getElementById('visitorModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Function to set up all add buttons
function setupAddButtons() {
    // Add buttons for experience, education, org, lang
    document.querySelectorAll('.add-item-btn:not([data-skill-type])').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!isAdmin) {
                e.preventDefault();
                showVisitorModal();
                return;
            }
            const sectionType = this.getAttribute('data-section');
            addNewItem(sectionType);
        });
    });
    
    // Special handling for skills (software and general)
    document.querySelectorAll('.add-item-btn[data-skill-type]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!isAdmin) {
                e.preventDefault();
                showVisitorModal();
                return;
            }
            const sectionType = 'skills';
            const skillType = this.getAttribute('data-skill-type');
            addNewItem(sectionType, skillType);
        });
    });
}

// Function to add new item to a section
function addNewItem(sectionType, skillType = null) {
    // Only proceed if admin
    if (!isAdmin) return;

    let container;
    let newItemHtml;
    const newId = `${sectionType}-${Date.now()}`;
    
    // Rest of your addNewItem function remains the same...
    // (Keep all the existing code from the previous implementation)
}

// Close modal when clicking the close button (×)
document.querySelector('.close-modal')?.addEventListener('click', function() {
  closeVisitorModal();
});

// Go to login when clicking the login button
document.getElementById('goToLoginBtn')?.addEventListener('click', function() {
  window.location.href = 'access.html';
});

// Add this CSS for character animation
document.head.insertAdjacentHTML('beforeend', `
<style>
  @keyframes charColor {
      0% {
          color: inherit;
      }
      100% {
          color: var(--main-color);
      }
  }
  
  .desc span {
      display: inline-block;
      opacity: 0;
      animation: fadeIn 0.3s forwards;
  }
  
  @keyframes fadeIn {
      to {
          opacity: 1;
      }
  }
</style>
`);
// Tab Activation Logic
document.addEventListener('DOMContentLoaded', function () {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(tab => {
      tab.addEventListener('click', function () {
          // Remove active class from all tabs and contents
          tabLinks.forEach(t => t.classList.remove('active'));
          tabContents.forEach(t => t.classList.remove('active'));

          // Add active class to the clicked tab and corresponding content
          this.classList.add('active');
          const targetTab = document.getElementById(this.getAttribute('data-tab'));
          targetTab.classList.add('active');

          // Apply typing animation to the <p> inside the active tab
          const desc = targetTab.querySelector('.desc');
          if (desc) {
              typeText(desc, desc.textContent);
          }
      });
  });

  // Trigger typing animation for the initially active tab
  const initialTab = document.querySelector('.tab-content.active');
  if (initialTab) {
      const initialDesc = initialTab.querySelector('.desc');
      if (initialDesc) {
          typeText(initialDesc, initialDesc.textContent);
      }
  }
});
// Navbar actions and all section actions along with cube rotation when navbar is clicked
navs.forEach((nav, idx) => {
  nav.addEventListener('click', () => {
    document.querySelector('.nav-list li.active').classList.remove('active');    
    nav.classList.add('active');    

    cube.style.transform = `rotateY(${idx * -90}deg)`;
  
    document.querySelector('.section.active').classList.remove('active');    
    sections[idx].classList.add('active');

    const array = Array.from(sections);
    const arrSecs = array.slice(1, -1); // Only requires indexes 1, 2, 3 or does not require strat and end indexes
    arrSecs.forEach(arrSecs => {
      if (arrSecs.classList.contains('active')) {
        console.log('ok');
      }
    })
  });
});


// Loading Bars
// Loading Bars - Updated for multiple bars
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.loading-bar-container').forEach(container => {
      const value = parseFloat(container.getAttribute('data-value'));
      const max = parseFloat(container.getAttribute('data-max'));
      const percentage = (value / max) * 100;

      const progressBar = container.querySelector('.loading-bar-progress');
      const shineBar = container.querySelector('.loading-bar-shine');
      const textElement = container.querySelector('.loading-bar-text');

      progressBar.style.width = `${percentage}%`;
      shineBar.style.width = '100%';
      textElement.textContent = `${percentage}%`;
  });
});

// Resume section when clicking tab-list
resumeLists.forEach((list, idx) => {
  list.addEventListener('click', () => {
    
    document.querySelector('.resume-list.active').classList.remove('active');    
    list.classList.add('active');

    document.querySelector('.resume-box.active').classList.remove('active');    
    resumeBoxs[idx].classList.add('active');
  });
});

// additional section when clicking tab-list
additionalLists.forEach((list, idx) => {
  list.addEventListener('click', () => {
    document.querySelector('.additional-list.active').classList.remove('active');    
    list.classList.add('active');

    document.querySelector('.additional-box.active').classList.remove('active');    
    additionalBoxs[idx].classList.add('active');
  });
});

// Visibility for contact section when loading (cube loading animation)

// Messaging


// Text Reveal

// Improved Typing Animation Function
// function typeText(element, speed = 30) {
//   const text = element.textContent;
//   element.textContent = ''; // Clear the text initially
//   let index = 0;
  
  // Create and add blinking cursor
  
  
  
  

  
//   type(); // Start animation
// }

// Initialize typing animations
document.addEventListener('DOMContentLoaded', function() {
  // Animate all .desc elements on load
  document.querySelectorAll('.desc').forEach(desc => {
      typeText(desc);
  });
  
  // Animate when switching sections
  navs.forEach((nav, idx) => {
      nav.addEventListener('click', () => {
          setTimeout(() => {
              document.querySelectorAll('.section.active .desc').forEach(desc => {
                  typeText(desc);
              });
          }, 500); // Small delay to allow section transition
      });
  });
});

// Open Links in new Tab
// Make all external links open in new tab
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="http"]'); // Selects all links starting with http
  links.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
  });
});
// Scrolling
document.querySelectorAll('.general-skill-progress, .software-skill-progress').forEach(container => {
  container.addEventListener('wheel', (event) => {
      container.scrollTop += event.deltaY;
      event.preventDefault(); // Prevents page scrolling
  });
});

// Pop Up After Submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Show the pop-up message
  popupMessage.classList.remove('hidden');
  popupMessage.classList.add('show');

  // Hide the pop-up message after 3 seconds
  setTimeout(() => {
      popupMessage.classList.remove('show');
      popupMessage.classList.add('hidden');
  }, 3000);

  // Reset the form
  form.reset();
});

// ======================
// TUTORIAL SYSTEM
// ======================
document.addEventListener('DOMContentLoaded', function() {
  const tutorialOverlay = document.getElementById('tutorial-overlay');
  const tutorialButton = document.getElementById('tutorial-button');
  const navItems = document.querySelectorAll('.nav-list li');
  const sections = document.querySelectorAll('.section');
  const cube = document.querySelector('.box');
  
  // Tutorial Steps - Updated with Skills tab
  const steps = [
      {
          title: "Welcome to My additional!",
          content: "Let me guide you through my interactive additional. Click Next to continue.",
          element: ".home",
          position: "center"
      },
      {
          title: "Navigation",
          content: "Use these icons to switch between different sections. The cube will rotate with each click!",
          element: ".nav-list",
          position: "top"
      },
      {
          title: "About Me",
          content: "Here you can learn more about my background and skills.",
          element: ".about-info",
          position: "right",
          preAction: () => activateSection(1)
      },
      {
          title: "My Resume",
          content: "Explore my professional experience and skills.",
          element: ".resume",
          position: "right",
          preAction: () => activateSection(2)
      },
      {
          title: "Experience",
          content: "View my work history and professional engagements.",
          element: ".resume-box.experience",
          position: "right"
      },
      {
          title: "Skills",
          content: "Check my technical and general skill proficiencies.",
          element: ".resume-box.skills",
          position: "right",
          preAction: () => switchResumeTab(1) // Switch to Skills tab
      },
      {
          title: "Education",
          content: "See my academic qualifications and certifications.",
          element: ".resume-box.education",
          position: "right",
          preAction: () => switchResumeTab(2)
      },
      {
          title: "Tutorial Complete!",
          content: "You're ready to explore! Click Finish to return to the home page.",
          element: ".nav",
          position: "top",
          isFinal: true
      }
  ];

  let currentStep = 0;
  let currentTooltip = null;

  // Initialize tutorial
  tutorialButton.addEventListener('click', (e) => {
      e.preventDefault();
      startTutorial();
 

  function startTutorial() {
      currentStep = 0;
      showStep();
      tutorialOverlay.style.display = 'block';
      tutorialButton.style.display = 'none';
  }
 });
  function showStep() {
    // Clean up previous step
    if (currentTooltip) {
      document.body.removeChild(currentTooltip);
      currentTooltip = null;
    }
    
    document.querySelectorAll('.highlight-element').forEach(el => {
      el.classList.remove('highlight-element');
    });

    const step = steps[currentStep];
    
    // Execute pre-action if exists
    if (step.preAction) {
      step.preAction();
    }

    // Get target element
    const element = document.querySelector(step.element);
    if (!element) {
      console.error('Element not found:', step.element);
      nextStep();
      return;
    }

    // Highlight element
    element.classList.add('highlight-element');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Create tooltip
    createTooltip(element, step);
  }

  function createTooltip(element, step) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tutorial-tooltip';

    // Position tooltip
    const rect = element.getBoundingClientRect();
    let top, left;

    switch(step.position) {
      case 'top':
        top = rect.top + window.scrollY - 20;
        left = rect.left + window.scrollX + (rect.width / 2);
        tooltip.style.transform = 'translate(-50%, -100%)';
        break;
      case 'right':
        top = rect.top + window.scrollY + (rect.height / 2);
        left = rect.left + window.scrollX + rect.width + 30;
        tooltip.style.transform = 'translateY(-50%)';
        break;
      case 'center':
        top = window.innerHeight / 2 + window.scrollY;
        left = window.innerWidth / 2 + window.scrollX;
        tooltip.style.transform = 'translate(-50%, -50%)';
        break;
      default:
        top = rect.bottom + window.scrollY + 20;
        left = rect.left + window.scrollX;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'tutorial-buttons';

    // Previous button
    if (currentStep > 0) {
      const prevButton = document.createElement('button');
      prevButton.className = 'tutorial-btn tutorial-btn-prev';
      prevButton.innerHTML = '<i class="bx bx-chevron-left"></i> Previous';
      prevButton.addEventListener('click', prevStep);
      buttonsContainer.appendChild(prevButton);
    } else {
      const spacer = document.createElement('div');
      spacer.style.flex = '1';
      buttonsContainer.appendChild(spacer);
    }

    // Next/Finish button
    const nextButton = document.createElement('button');
    nextButton.className = step.isFinal ? 'tutorial-btn tutorial-btn-finish' : 'tutorial-btn';
    nextButton.innerHTML = step.isFinal 
      ? 'Finish <i class="bx bx-check"></i>' 
      : 'Next <i class="bx bx-chevron-right"></i>';
    nextButton.addEventListener('click', () => {
      if (step.isFinal) {
        endTutorial();
      } else {
        nextStep();
      }
    });
    buttonsContainer.appendChild(nextButton);

    // Progress indicator
    const progress = document.createElement('div');
    progress.className = 'tutorial-progress';
    progress.textContent = `Step ${currentStep + 1} of ${steps.length}`;

    // Build tooltip content
    tooltip.innerHTML = `
      <h3>${step.title}</h3>
      <p>${step.content}</p>
    `;
    tooltip.appendChild(buttonsContainer);
    tooltip.appendChild(progress);

    document.body.appendChild(tooltip);
    currentTooltip = tooltip;
  }

  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep();
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      showStep();
    }
  }

  function endTutorial() {
    tutorialOverlay.style.display = 'none';
    if (currentTooltip) {
      document.body.removeChild(currentTooltip);
    }
    document.querySelectorAll('.highlight-element').forEach(el => {
      el.classList.remove('highlight-element');
    });
    // Reset cube and navigation to home position
    activateSection(0);
    // Keep the tutorial button visible for future use
    tutorialButton.style.display = 'block';
  }

  // Ensure these helper functions exist:
function activateSection(index) {
  document.querySelector('.section.active').classList.remove('active');
  sections[index].classList.add('active');
  cube.style.transform = `rotateY(${index * -90}deg)`;
  document.querySelector('.nav-list li.active').classList.remove('active');
  navItems[index].classList.add('active');
}

function switchResumeTab(index) {
  document.querySelector('.resume-list.active').classList.remove('active');
  document.querySelector('.resume-box.active').classList.remove('active');
  document.querySelectorAll('.resume-list')[index].classList.add('active');
  document.querySelectorAll('.resume-box')[index].classList.add('active');
}
});

// Copy Protection System
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('copyProtectionOverlay');
  const warning = document.getElementById('copyProtectionWarning');
  
  // Disable right-click
  document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      showWarning();
  });
  
  // Disable cut/copy/paste
  document.addEventListener('cut', function(e) {
      e.preventDefault();
      showWarning();
  });
  
  document.addEventListener('copy', function(e) {
      e.preventDefault();
      showWarning();
  });
  
  document.addEventListener('paste', function(e) {
      e.preventDefault();
      showWarning();
  });
  
  // Disable keyboard shortcuts (Ctrl+C, Ctrl+X, Ctrl+V)
  document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'v')) {
          e.preventDefault();
          showWarning();
      }
  });
  
  function showWarning() {
      // Vibrate the screen
      document.body.classList.add('vibrate');
      setTimeout(() => {
          document.body.classList.remove('vibrate');
      }, 300);
      
      // Show warning overlay
      overlay.style.display = 'flex';
      warning.style.animation = 'none';
      void warning.offsetWidth; // Trigger reflow
      warning.style.animation = 'farCryEffect 0.8s ease-out';
      
      // Hide after 2 seconds
      setTimeout(() => {
          overlay.style.display = 'none';
      }, 2000);
  }
});

const musicControlWrapper = document.querySelector('.music-control-wrapper');
const musicControlPanel = document.querySelector('.music-control-panel');
const musicTrigger = document.querySelector('.music-trigger');
let isInteracting = false;

// Show panel with attached effect
musicControlWrapper.addEventListener('mouseenter', () => {
    musicControlPanel.classList.add('interacting');
});

// Keep panel visible when interacting
musicControlPanel.addEventListener('mouseenter', () => {
    isInteracting = true;
});

// Hide panel when leaving
musicControlPanel.addEventListener('mouseleave', () => {
    isInteracting = false;
    if (!musicControlWrapper.matches(':hover')) {
        musicControlPanel.classList.remove('interacting');
    }
});

musicControlWrapper.addEventListener('mouseleave', () => {
    if (!isInteracting) {
        musicControlPanel.classList.remove('interacting');
    }
});

// Audio controls
const bgMusic = document.getElementById('bgMusic');
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');

// Initialize
bgMusic.volume = volumeSlider.value / 100;

volumeSlider.addEventListener('input', function() {
    bgMusic.volume = this.value / 100;
    if (bgMusic.muted) {
        bgMusic.muted = false;
        muteBtn.classList.remove('muted');
    }
});

muteBtn.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtn.classList.toggle('muted', bgMusic.muted);
});

// Handle autoplay
document.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log('Autoplay blocked:', e));
    }
}, { once: true });
// Language Switcher
// Import language files
// import enTranslations from './lang-en.js';
// import mlTranslations from './lang-ml.js';

// const translations = {
//     en: enTranslations,
//     ml: mlTranslations
// };

// let currentLang = 'en';

// function updateContent(lang) {
//     currentLang = lang;
//     const t = translations[lang];
    
//     // Update text content
//     document.querySelectorAll('[data-i18n]').forEach(el => {
//         const key = el.getAttribute('data-i18n');
//         if (t[key]) {
//             el.textContent = t[key];
//         }
//     });
    
//     // Update rotating roles in home section
//     const rolesContainer = document.querySelector('.home-info h3');
//     if (rolesContainer) {
//         const rolesHTML = t.home_roles.map((role, i) => 
//             `<span style="--i:${t.home_roles.length - i};" data-text="${role}">${role}</span>`
//         ).join(' ');
//         rolesContainer.innerHTML = `${t.home_subtitle} ${rolesHTML}`;
//     }
    
//     // Update active language button
//     document.querySelectorAll('.lang-btn').forEach(btn => {
//         btn.classList.toggle('active', btn.dataset.lang === lang);
//     });
    
//     // Store preference
//     localStorage.setItem('preferredLang', lang);
// }

// // Initialize
// document.addEventListener('DOMContentLoaded', () => {
//     // Set initial language
//     const savedLang = localStorage.getItem('preferredLang') || 'en';
//     updateContent(savedLang);
    
//     // Language switcher event listeners
//     document.querySelectorAll('.lang-btn').forEach(btn => {
//         btn.addEventListener('click', () => {
//             updateContent(btn.dataset.lang);
//         });
//     });
// });

// Screen Size
// Redirect mobile users (optional)
// if (window.innerWidth < 1024) {
//   window.location.href = "https://your-desktop-optimized-site.com";
// }