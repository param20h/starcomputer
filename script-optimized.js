// Star Computer Center - Optimized JavaScript
// Course Card Flip Functionality - Click Only

document.addEventListener('DOMContentLoaded', function() {
    
    // Course Card Setup - Click to Flip
    function setupCourseCards() {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            const learnMoreBtn = card.querySelector('.learn-more-btn');
            const flipBackBtn = card.querySelector('.flip-back-btn');
            
            // Flip to back on "Learn More" button click
            if (learnMoreBtn) {
                learnMoreBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    card.classList.add('flipped');
                });
            }
            
            // Flip back to front on close button click
            if (flipBackBtn) {
                flipBackBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    card.classList.remove('flipped');
                });
            }
            
            // Optional: Click anywhere on back side to flip back
            const backSide = card.querySelector('.course-card-back');
            if (backSide) {
                backSide.addEventListener('click', function(e) {
                    // Only flip back if clicking on the back side itself, not on buttons
                    if (e.target === backSide || e.target.closest('.course-card-back') === backSide) {
                        if (!e.target.closest('button') && !e.target.closest('ul') && !e.target.closest('.grid')) {
                            card.classList.remove('flipped');
                        }
                    }
                });
            }
        });
    }
    
    // Initialize course cards
    setupCourseCards();
    
    // Course Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseContainers = document.querySelectorAll('.course-card-container');

    if (filterButtons.length > 0 && courseContainers.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button styling
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                });
                
                button.classList.remove('bg-gray-200', 'text-gray-700');
                button.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
                
                // Filter courses with smooth animation
                courseContainers.forEach((container, index) => {
                    const category = container.getAttribute('data-category');
                    const card = container.querySelector('.course-card');
                    
                    if (filter === 'all' || category === filter) {
                        container.style.display = 'block';
                        setTimeout(() => {
                            container.style.opacity = '1';
                            container.style.transform = 'translateY(0)';
                        }, index * 100);
                    } else {
                        container.style.opacity = '0';
                        container.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            container.style.display = 'none';
                        }, 300);
                    }
                    
                    // Reset any flipped cards when filtering
                    if (card) {
                        card.classList.remove('flipped');
                    }
                });
            });
        });
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    let mobileMenuOpen = false;

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenuOpen = !mobileMenuOpen;
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('hidden');
            
            // Update ARIA attributes for accessibility
            hamburger.setAttribute('aria-expanded', mobileMenuOpen);
            mobileMenu.setAttribute('aria-hidden', !mobileMenuOpen);
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                document.body.style.overflow = 'hidden';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Add click handlers for navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (mobileMenuOpen) {
                hamburger.click();
            }
        });
    });
    
    // Make scrollToSection globally available for onclick handlers
    window.scrollToSection = scrollToSection;
    
    // Counter Animation for Statistics
    function animateCounters() {
        const counters = document.querySelectorAll('[data-target]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 100;
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.1 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Initialize counter animation
    animateCounters();
    
    // FAQ Dropdown Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('i');
                    otherAnswer.classList.add('hidden');
                    otherIcon.classList.remove('rotate-180');
                }
            });
            
            // Toggle current FAQ
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                icon.classList.add('rotate-180');
            } else {
                answer.classList.add('hidden');
                icon.classList.remove('rotate-180');
            }
        });
    });
    
    // Close mobile menu on resize to larger screen
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && mobileMenuOpen) {
            hamburger.click();
        }
    });
    
});