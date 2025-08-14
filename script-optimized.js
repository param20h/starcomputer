// Star Computer Center - Optimized JavaScript
// Course Card Flip Functionality - Click Only

document.addEventListener('DOMContentLoaded', function() {
    
    // Course Filter Functionality - Updated for new modern design
    const filterButtons = document.querySelectorAll('.course-filter-btn');
    const courseCards = document.querySelectorAll('.modern-course-card');

    if (filterButtons.length > 0 && courseCards.length > 0) {
        console.log(`Found ${courseCards.length} modern course cards`); // Debug log
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button styling
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-blue-500', 'text-white', 'active');
                    btn.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
                });
                
                button.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
                button.classList.add('bg-blue-500', 'text-white', 'active');
                
                // Filter courses with smooth animation
                courseCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    } else {
                        card.style.transition = 'all 0.3s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-10px) scale(0.95)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    } else {
        console.warn('Course filter elements not found - new design');
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
    
    // Close mobile menu on resize to larger screen
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && mobileMenuOpen) {
            hamburger.click();
        }
    });

    // Gallery and Modal Functionality
    let currentImageIndex = 0;
    const galleryImages = [
        'images/IMG-20250813-WA0025.jpg',
        'images/IMG-20250813-WA0026.jpg',
        'images/IMG-20250813-WA0027.jpg',
        'images/IMG-20250813-WA0028.jpg',
        'images/IMG-20250813-WA0029.jpg',
        'images/IMG-20250813-WA0030.jpg',
        'images/IMG-20250813-WA0031.jpg',
        'images/IMG-20250813-WA0032.jpg',
        'images/IMG-20250813-WA0033.jpg',
        'images/IMG-20250813-WA0034.jpg',
        'images/IMG-20250813-WA0035.jpg'
    ];

    // Initialize gallery
    function initializeGallery() {
        console.log('🖼️ Initializing gallery with', galleryImages.length, 'images');
        
        // Set up the initial state
        showImage(0);
        
        // Update total images counter
        const totalImagesElement = document.getElementById('total-images');
        if (totalImagesElement) {
            totalImagesElement.textContent = galleryImages.length;
        }
    }

    // Call initialize function
    setTimeout(initializeGallery, 500);

    // Image Gallery Functions
    window.showImage = function(index) {
        console.log('🖼️ showImage called with index:', index);
        currentImageIndex = index;
        const mainImage = document.getElementById('gallery-main-image');
        const currentCounter = document.getElementById('current-image-number');
        
        if (!mainImage) {
            console.error('❌ Main gallery image element not found!');
            return;
        }
        
        if (index < 0 || index >= galleryImages.length) {
            console.error('❌ Invalid image index:', index);
            return;
        }
        
        console.log('✅ Changing image to:', galleryImages[index]);
        mainImage.src = galleryImages[index];
        
        // Update image counter
        if (currentCounter) {
            currentCounter.textContent = index + 1;
        }
        
        // Update thumbnail borders
        document.querySelectorAll('.thumbnail-btn').forEach((btn, i) => {
            if (i === index) {
                btn.classList.remove('border-transparent', 'border-gray-300');
                btn.classList.add('border-blue-500');
            } else {
                btn.classList.remove('border-blue-500');
                btn.classList.add('border-transparent');
            }
        });
    };

    window.previousImage = function() {
        console.log('⬅️ Previous image clicked, current index:', currentImageIndex);
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
        console.log('⬅️ New index:', currentImageIndex);
        showImage(currentImageIndex);
    };

    window.nextImage = function() {
        console.log('➡️ Next image clicked, current index:', currentImageIndex);
        currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
        console.log('➡️ New index:', currentImageIndex);
        showImage(currentImageIndex);
    };

    // Image Modal Functions
    window.openImageModal = function() {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalGalleryImage');
        if (modal && modalImage) {
            modalImage.src = galleryImages[currentImageIndex];
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            updateModalCounter();
        }
    };

    window.closeImageModal = function() {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    window.previousImageModal = function() {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
        const modalImage = document.getElementById('modalGalleryImage');
        if (modalImage) {
            modalImage.src = galleryImages[currentImageIndex];
            updateModalCounter();
        }
    };

    window.nextImageModal = function() {
        currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
        const modalImage = document.getElementById('modalGalleryImage');
        if (modalImage) {
            modalImage.src = galleryImages[currentImageIndex];
            updateModalCounter();
        }
    };

    function updateModalCounter() {
        const currentElement = document.getElementById('modal-current-number');
        const totalElement = document.getElementById('modal-total-images');
        if (currentElement && totalElement) {
            currentElement.textContent = currentImageIndex + 1;
            totalElement.textContent = galleryImages.length;
        }
    }

    // Slideshow Functions for Hero Section
    let currentSlideIndex = 1;
    const totalSlides = 3;

    window.currentSlide = function(n) {
        showSlide(currentSlideIndex = n);
    };

    function showSlide(n) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        if (n > totalSlides) currentSlideIndex = 1;
        if (n < 1) currentSlideIndex = totalSlides;
        
        slides.forEach((slide, index) => {
            if (index + 1 === currentSlideIndex) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
        
        dots.forEach((dot, index) => {
            if (index + 1 === currentSlideIndex) {
                dot.classList.add('active', 'bg-purple-600');
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.remove('active', 'bg-purple-600');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    // Testimonial Slider Functions
    let currentTestimonialIndex = 1;
    const totalTestimonials = 5;

    // Override currentSlide for testimonials
    window.currentSlide = function(n) {
        showTestimonial(currentTestimonialIndex = n);
    };

    function showTestimonial(n) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        
        if (n > totalTestimonials) currentTestimonialIndex = 1;
        if (n < 1) currentTestimonialIndex = totalTestimonials;
        
        testimonials.forEach((testimonial, index) => {
            if (index + 1 === currentTestimonialIndex) {
                testimonial.classList.remove('hidden');
                testimonial.classList.add('active');
                // Add fade in animation
                testimonial.style.opacity = '0';
                testimonial.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    testimonial.style.transition = 'all 0.5s ease';
                    testimonial.style.opacity = '1';
                    testimonial.style.transform = 'translateY(0)';
                }, 50);
            } else {
                testimonial.classList.add('hidden');
                testimonial.classList.remove('active');
            }
        });
        
        dots.forEach((dot, index) => {
            if (index + 1 === currentTestimonialIndex) {
                dot.classList.add('active', 'bg-purple-600');
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.remove('active', 'bg-purple-600');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    // Auto testimonial slideshow
    function autoTestimonialSlide() {
        currentTestimonialIndex++;
        if (currentTestimonialIndex > totalTestimonials) currentTestimonialIndex = 1;
        showTestimonial(currentTestimonialIndex);
    }

    // Start auto testimonial slideshow
    setInterval(autoTestimonialSlide, 6000); // Change every 6 seconds

    // Auto slideshow for hero section (if exists)
    function autoSlide() {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            let heroSlideIndex = 1;
            heroSlideIndex++;
            if (heroSlideIndex > totalSlides) heroSlideIndex = 1;
            // Hero slide functionality here if needed
        }
    }

    // Certificate Modal Functions
    window.openCertificateModal = function(imageSrc) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('certificateModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'certificateModal';
            modal.className = 'fixed inset-0 z-50 hidden';
            modal.innerHTML = `
                <div class="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4" onclick="closeCertificateModal()">
                    <div class="relative max-w-4xl max-h-full" onclick="event.stopPropagation()">
                        <img id="certificateModalImage" src="" alt="Certificate" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl">
                        <button onclick="closeCertificateModal()" class="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-all">
                            <i class="fas fa-times text-lg"></i>
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        const modalImage = document.getElementById('certificateModalImage');
        if (modalImage) {
            modalImage.src = imageSrc;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    // Course Details and Enrollment Functionality
    const courseData = {
        'Microsoft Excel': {
            icon: 'fas fa-file-excel',
            iconBg: 'from-green-400 to-emerald-500',
            subtitle: 'Master spreadsheets, formulas, and data analysis',
            duration: '4 weeks • 3 hours/day',
            level: 'Beginner to Advanced',
            start: 'Next Monday',
            price: '₹3,500',
            originalPrice: '₹5,000',
            curriculum: [
                'Excel basics and interface navigation',
                'Formulas and functions mastery',
                'Data analysis and pivot tables',
                'Charts and graphs creation',
                'Macros and automation',
                'Real-world business projects'
            ],
            prerequisites: 'Basic computer knowledge recommended'
        },
        'Python Programming': {
            icon: 'fab fa-python',
            iconBg: 'from-yellow-400 to-orange-500',
            subtitle: 'Learn programming with Python from basics to advanced',
            duration: '8 weeks • 2.5 hours/day',
            level: 'Beginner to Intermediate',
            start: 'Every Monday',
            price: '₹6,000',
            originalPrice: '₹8,000',
            curriculum: [
                'Python syntax and programming basics',
                'Data structures and algorithms',
                'Object-oriented programming',
                'File handling and databases',
                'Web scraping and APIs',
                'Real-world projects and portfolio'
            ],
            prerequisites: 'No prior programming experience required'
        },
        'Web Development': {
            icon: 'fas fa-code',
            iconBg: 'from-blue-400 to-purple-500',
            subtitle: 'Build modern websites and web applications',
            duration: '12 weeks • 3 hours/day',
            level: 'Beginner to Advanced',
            start: 'Every 2nd Monday',
            price: '₹12,000',
            originalPrice: '₹15,000',
            curriculum: [
                'HTML5 and CSS3 fundamentals',
                'JavaScript and DOM manipulation',
                'Responsive design principles',
                'Modern frameworks (React basics)',
                'Backend basics with Node.js',
                'Project deployment and hosting'
            ],
            prerequisites: 'Basic computer and internet knowledge'
        },
        'Microsoft Word': {
            icon: 'fas fa-file-word',
            iconBg: 'from-blue-400 to-cyan-500',
            subtitle: 'Professional document creation and formatting',
            duration: '3 weeks • 2 hours/day',
            level: 'Beginner to Advanced',
            start: 'Every Monday',
            price: '₹2,500',
            originalPrice: '₹3,500',
            curriculum: [
                'Document creation and formatting',
                'Advanced typography and styles',
                'Tables, headers, and references',
                'Mail merge and templates',
                'Collaboration and review features',
                'Professional document design'
            ],
            prerequisites: 'Basic computer knowledge'
        },
        'Graphic Design': {
            icon: 'fas fa-paint-brush',
            iconBg: 'from-pink-400 to-red-500',
            subtitle: 'Create stunning visuals with professional design tools',
            duration: '10 weeks • 3 hours/day',
            level: 'Beginner to Intermediate',
            start: 'Every 2nd Monday',
            price: '₹8,000',
            originalPrice: '₹10,000',
            curriculum: [
                'Design principles and color theory',
                'Adobe Photoshop mastery',
                'Adobe Illustrator fundamentals',
                'Logo and brand design',
                'Print and digital media design',
                'Portfolio development'
            ],
            prerequisites: 'Creative mindset and basic computer skills'
        },
        'Advanced Web Design': {
            icon: 'fas fa-palette',
            iconBg: 'from-purple-400 to-pink-500',
            subtitle: 'Advanced UI/UX design and modern web technologies',
            duration: '8 weeks • 3 hours/day',
            level: 'Intermediate to Advanced',
            start: 'Every 3rd Monday',
            price: '₹9,000',
            originalPrice: '₹12,000',
            curriculum: [
                'Advanced CSS animations and effects',
                'UI/UX design principles',
                'Figma and design systems',
                'Advanced JavaScript interactions',
                'Mobile-first responsive design',
                'Performance optimization'
            ],
            prerequisites: 'Basic HTML/CSS knowledge required'
        }
    };

    // Open course details modal
    window.openCourseModal = function(courseName) {
        const modal = document.getElementById('courseModal');
        const course = courseData[courseName];
        
        if (!course) {
            console.error('Course not found:', courseName);
            return;
        }
        
        // Populate modal content
        document.getElementById('modalCourseTitle').textContent = courseName;
        document.getElementById('modalCourseSubtitle').textContent = course.subtitle;
        document.getElementById('modalCourseDuration').textContent = course.duration;
        document.getElementById('modalCourseLevel').textContent = course.level;
        document.getElementById('modalCourseStart').textContent = course.start;
        document.getElementById('modalCoursePrice').textContent = course.price;
        document.getElementById('modalCourseOriginalPrice').textContent = course.originalPrice;
        document.getElementById('modalCoursePrerequisites').textContent = course.prerequisites;
        
        // Update icon
        const iconElement = document.querySelector('#modalCourseIcon i');
        const iconContainer = document.getElementById('modalCourseIcon');
        iconElement.className = `${course.icon} text-white text-3xl`;
        iconContainer.className = `w-20 h-20 bg-gradient-to-br ${course.iconBg} rounded-2xl flex items-center justify-center mb-4`;
        
        // Populate curriculum
        const curriculumContainer = document.getElementById('modalCourseCurriculum');
        curriculumContainer.innerHTML = course.curriculum.map(item => `
            <div class="flex items-start">
                <i class="fas fa-check text-green-500 mr-3 mt-1"></i>
                <span class="text-gray-700">${item}</span>
            </div>
        `).join('');
        
        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    // Close course details modal
    window.closeCourseModal = function() {
        const modal = document.getElementById('courseModal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    // Open enrollment modal
    window.openEnrollModal = function() {
        const courseTitle = document.getElementById('modalCourseTitle').textContent;
        const enrollModal = document.getElementById('enrollModal');
        
        // Set course name in enrollment form
        document.getElementById('enrollCourse').value = courseTitle;
        
        // Close course modal and open enrollment modal
        closeCourseModal();
        enrollModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    // Close enrollment modal
    window.closeEnrollModal = function() {
        const modal = document.getElementById('enrollModal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Reset form
        document.getElementById('enrollmentForm').reset();
    };

    // Handle enrollment form submission
    document.addEventListener('DOMContentLoaded', function() {
        const enrollmentForm = document.getElementById('enrollmentForm');
        if (enrollmentForm) {
            enrollmentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('enrollName').value,
                    email: document.getElementById('enrollEmail').value,
                    phone: document.getElementById('enrollPhone').value,
                    course: document.getElementById('enrollCourse').value,
                    message: document.getElementById('enrollMessage').value || 'Course enrollment request'
                };
                
                // Send email using EmailJS (same as contact form)
                const templateParams = {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    subject: `Course Enrollment: ${formData.course}`,
                    message: `Course: ${formData.course}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`
                };
                
                // Show loading state
                const submitBtn = enrollmentForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Send email using EmailJS
                emailjs.send('service_t5b42qd', 'template_bnikeho', templateParams, 'a_P5RxvAZq130yGsX')
                .then(function(response) {
                    console.log('Enrollment email sent successfully:', response);
                    
                    // Show success message
                    alert('🎉 Enrollment request sent successfully! We will contact you within 24 hours to confirm your enrollment.');
                    
                    // Close modal and reset form
                    closeEnrollModal();
                })
                .catch(function(error) {
                    console.error('Failed to send enrollment email:', error);
                    alert('❌ Sorry, there was an error sending your enrollment request. Please try again or contact us directly.');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            });
        }
    });

    // Add click handlers to course cards
    document.addEventListener('DOMContentLoaded', function() {
        // Course name mapping to handle different names in HTML vs courseData
        const courseNameMapping = {
            'Microsoft Excel': 'Microsoft Excel',
            'Programming Basics': 'Python Programming',
            'Web Development': 'Web Development',
            'Microsoft Word': 'Microsoft Word',
            'Graphic Design': 'Graphic Design',
            'Advanced Web Design': 'Advanced Web Design'
        };
        
        // View Details and Enroll buttons
        document.querySelectorAll('.modern-course-card').forEach(card => {
            const courseTitle = card.querySelector('h3').textContent.trim();
            const mappedCourseName = courseNameMapping[courseTitle] || courseTitle;
            
            // Get both buttons
            const buttons = card.querySelectorAll('button');
            const enrollBtn = buttons[0]; // First button (Enroll Now)
            const viewDetailsBtn = buttons[1]; // Second button (View Details)
            
            if (enrollBtn && enrollBtn.textContent.includes('Enroll Now')) {
                enrollBtn.addEventListener('click', function() {
                    console.log('Enroll clicked for:', mappedCourseName);
                    openCourseModal(mappedCourseName);
                    // Auto-open enrollment modal after a short delay
                    setTimeout(() => {
                        openEnrollModal();
                    }, 500);
                });
            }
            
            if (viewDetailsBtn && viewDetailsBtn.textContent.includes('View Details')) {
                viewDetailsBtn.addEventListener('click', function() {
                    console.log('View Details clicked for:', mappedCourseName);
                    openCourseModal(mappedCourseName);
                });
            }
        });
    });

    window.closeCertificateModal = function() {
        const modal = document.getElementById('certificateModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
            closeCertificateModal();
            closeCourseModal();
            closeEnrollModal();
        }
    });

    // Close modals when clicking outside
    document.addEventListener('DOMContentLoaded', function() {
        // Course modal click outside to close
        const courseModal = document.getElementById('courseModal');
        if (courseModal) {
            courseModal.addEventListener('click', function(e) {
                if (e.target === courseModal) {
                    closeCourseModal();
                }
            });
        }
        
        // Enrollment modal click outside to close
        const enrollModal = document.getElementById('enrollModal');
        if (enrollModal) {
            enrollModal.addEventListener('click', function(e) {
                if (e.target === enrollModal) {
                    closeEnrollModal();
                }
            });
        }
    });

    // FAQ Dropdown Functionality
    function setupFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.closest('.faq-item');
                const answer = faqItem.querySelector('.faq-answer');
                const icon = this.querySelector('.fas');
                
                // Toggle the answer visibility
                if (answer.classList.contains('hidden')) {
                    // Close all other FAQ items first
                    faqQuestions.forEach(otherQuestion => {
                        const otherItem = otherQuestion.closest('.faq-item');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherQuestion.querySelector('.fas');
                        
                        if (otherItem !== faqItem) {
                            otherAnswer.classList.add('hidden');
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Open this FAQ item
                    answer.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    // Close this FAQ item
                    answer.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }
    
    // Initialize FAQ functionality
    setupFAQ();

});