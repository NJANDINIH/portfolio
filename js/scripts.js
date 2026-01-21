// Scroll reveal animations
function revealOnScroll() {
  const reveals = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
  
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('visible');
    }
  });
}

// Header scroll effect
function handleScroll() {
  const header = document.getElementById('header');
  const scrollTop = window.pageYOffset;
  
  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Show/hide scroll to top button
  const scrollToTop = document.getElementById('scrollToTop');
  if (scrollTop > 300) {
    scrollToTop.classList.add('show');
  } else {
    scrollToTop.classList.remove('show');
  }
  
  revealOnScroll();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Skills chart
function createSkillsChart() {
  const ctx = document.getElementById('skillsChart').getContext('2d');
  
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, 'hsl(220, 95%, 45%)');
  gradient1.addColorStop(1, 'hsl(220, 95%, 55%)');
  
  const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, 'hsl(270, 85%, 35%)');
  gradient2.addColorStop(1, 'hsl(270, 85%, 45%)');
  
  const gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient3.addColorStop(0, 'hsl(320, 65%, 70%)');
  gradient3.addColorStop(1, 'hsl(320, 65%, 80%)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Python', 'Java', 'JavaScript', 'MySQL', 'Cybersecurity', 'HTML/CSS'],
      datasets: [{
        label: 'Skill Level',
        data: [90, 80, 75, 85, 70, 88],
        backgroundColor: [
          gradient1, gradient2, gradient3, gradient1, gradient2, gradient3
        ],
        borderRadius: 8,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'hsl(var(--card))',
          titleColor: 'hsl(var(--foreground))',
          bodyColor: 'hsl(var(--foreground))',
          borderColor: 'hsl(var(--border))',
          borderWidth: 1,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}%`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: 'hsl(var(--muted-foreground))' }
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: { 
            color: 'hsl(var(--border))',
            drawBorder: false
          },
          ticks: {
            color: 'hsl(var(--muted-foreground))',
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}

// Form submission with PHP
function setupForm() {
  const contactForm = document.getElementById('contactForm');
  const loading = document.getElementById('loading');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide any previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Show loading
    loading.style.display = 'block';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData();
    formData.append('firstName', document.getElementById('firstName').value);
    formData.append('lastName', document.getElementById('lastName').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('subject', document.getElementById('subject').value);
    formData.append('message', document.getElementById('message').value);
    
    // Send form data using Fetch API
    fetch('process-form.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      // Success
      loading.style.display = 'none';
      successMessage.textContent = data;
      successMessage.style.display = 'block';
      submitButton.disabled = false;
      
      // Reset form
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(function() {
        successMessage.style.display = 'none';
      }, 5000);
    })
    .catch(error => {
      // Error
      loading.style.display = 'none';
      errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact me directly at siyabongasithole442@gmail.com';
      errorMessage.style.display = 'block';
      submitButton.disabled = false;
      
      // Hide error message after 5 seconds
      setTimeout(function() {
        errorMessage.style.display = 'none';
      }, 5000);
    });
  });
}

// Mobile menu toggle
function setupMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  mobileToggle.addEventListener('click', function() {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Scroll to top functionality
function setupScrollToTop() {
  document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupSmoothScrolling();
  createSkillsChart();
  setupForm();
  setupMobileMenu();
  setupScrollToTop();
  revealOnScroll(); // Initial check
});

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial scroll check
handleScroll();



const githubUsername = "NJANDINIH"; // your GitHub username
const dynamicContainer = document.getElementById("dynamic-projects");

// List of repos you want to show dynamically (can leave empty to show all public repos)
const includedRepos = ["barn-buddy-boutique2"];

fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    repos
      .filter(repo => includedRepos.length === 0 || includedRepos.includes(repo.name))
      .forEach(repo => {
        const card = document.createElement("div");
        card.classList.add("project-card", "fade-in"); // matches your existing animation

        card.innerHTML = `
          <div class="project-icon" style="background: linear-gradient(45deg, var(--accent), var(--primary));">
            <i class="fas fa-external-link-alt"></i>
          </div>
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description"}</p>
          <div class="project-tags">
            <span class="tag">GitHub</span>
          </div>
          <div class="project-actions">
            <a href="${repo.html_url}" class="btn btn-outline"><i class="fab fa-github"></i> Code</a>
            ${repo.homepage ? `<a href="${repo.homepage}" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> View</a>` : ""}
          </div>
        `;
        dynamicContainer.appendChild(card);
      });
  })
  .catch(err => console.error("Error loading GitHub repos:", err));
