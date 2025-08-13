/**
 * Optimized JavaScript for Star Computer Center
 * Minified and performance-focused
 */

// Optimized DOM ready with performance monitoring
(function() {
    'use strict';
    
    const startTime = performance.now();
    
    // Intersection Observer for animations (performance optimized)
    const observerOptions = {
        root: null,
        rootMargin: '10px',
        threshold: 0.1
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Optimized smooth scrolling
    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Optimized counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('[data-target]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Optimized testimonial slider
    let currentSlide = 1;
    const totalSlides = 3;
    
    function showSlide(n) {
        const slides = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        
        if (n > totalSlides) currentSlide = 1;
        if (n < 1) currentSlide = totalSlides;
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('hidden', index !== currentSlide - 1);
            slide.classList.toggle('active', index === currentSlide - 1);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('bg-purple-600', index === currentSlide - 1);
            dot.classList.toggle('bg-gray-300', index !== currentSlide - 1);
            dot.classList.toggle('active', index === currentSlide - 1);
        });
    }
    
    window.currentSlide = function(n) {
        currentSlide = n;
        showSlide(currentSlide);
    };
    
    // Auto-advance testimonials
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
    
    // Optimized course card flipping
    function setupCourseCards() {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            const learnMoreBtn = card.querySelector('.learn-more-btn');
            const flipBackBtn = card.querySelector('.flip-back-btn');
            
            // Learn More button - flip to back
            if (learnMoreBtn) {
                learnMoreBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    card.classList.add('flipped');
                });
            }
            
            // Flip back button - return to front
            if (flipBackBtn) {
                flipBackBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    card.classList.remove('flipped');
                });
            }
            
            // Click outside to flip back
            document.addEventListener('click', (e) => {
                if (!card.contains(e.target)) {
                    card.classList.remove('flipped');
                }
            });
        });
    }
    
    // Optimized course filtering
    function filterCourses(category) {
        const courses = document.querySelectorAll('.course-card-container');
        const buttons = document.querySelectorAll('.filter-btn');
        
        // Reset all cards to front before filtering
        document.querySelectorAll('.course-card').forEach(card => {
            card.classList.remove('flipped');
        });
        
        // Update active button
        buttons.forEach(btn => {
            const isActive = btn.getAttribute('data-filter') === category;
            btn.classList.toggle('bg-gradient-to-r', isActive);
            btn.classList.toggle('from-blue-500', isActive);
            btn.classList.toggle('to-purple-600', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('bg-gray-200', !isActive);
            btn.classList.toggle('text-gray-700', !isActive);
            btn.classList.toggle('active', isActive);
        });
        
        // Filter courses with animation
        courses.forEach((course, index) => {
            const courseCategory = course.getAttribute('data-category');
            const shouldShow = category === 'all' || courseCategory === category;
            
            setTimeout(() => {
                if (shouldShow) {
                    course.style.display = 'block';
                    course.style.opacity = '0';
                    course.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        course.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        course.style.opacity = '1';
                        course.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    course.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                    course.style.opacity = '0';
                    course.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        course.style.display = 'none';
                    }, 200);
                }
            }, index * 50);
        });
    }
    
    // Optimized FAQ functionality
    function setupFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('i');
                const isOpen = !answer.classList.contains('hidden');
                
                // Close all other FAQs
                faqQuestions.forEach(q => {
                    const a = q.nextElementSibling;
                    const i = q.querySelector('i');
                    a.classList.add('hidden');
                    i.style.transform = 'rotate(0deg)';
                });
                
                // Toggle current FAQ
                if (!isOpen) {
                    answer.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }
    
    // Gallery functionality
    window.openGallery = function() {
        alert('Gallery feature will be implemented in the next version!');
    };
    
    // Optimized mobile menu
    function setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('[data-mobile-menu]');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
    
    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Star Computer Center - Optimized Version Loading...');
        
        // Initialize components
        setupFAQ();
        setupMobileMenu();
        setupCourseCards();
        
        // Setup course filter event listeners
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                filterCourses(btn.getAttribute('data-filter'));
            });
        });
        
        // Setup scroll to section for navigation
        window.scrollToSection = scrollToSection;
        
        // Initialize intersection observer for animations
        document.querySelectorAll('[class*="animate-"]').forEach(el => {
            el.style.animationPlayState = 'paused';
            animationObserver.observe(el);
        });
        
        // Animate counters when in view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            counterObserver.observe(aboutSection);
        }
        
        // Performance logging
        const loadTime = performance.now() - startTime;
        console.log(`✅ Website loaded in ${loadTime.toFixed(2)}ms`);
        
        // Enhanced navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        const highlightNav = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };
        
        // Throttled scroll listener for performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    highlightNav();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        console.log('🎯 All optimizations loaded successfully!');
    });
    
    // Service Worker registration for caching
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('✅ Service Worker registered'))
                .catch(err => console.log('❌ Service Worker registration failed'));
        });
    }
    
})();
