// ================================
// NAVIGATION FUNCTIONALITY
// ================================

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section, header');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ================================
// TYPING ANIMATION
// ================================

const typedTextElement = document.querySelector('.typed-text');
const textArray = [
    'Systems Programmer',
    'Security Researcher',
    'Full-Stack Developer',
    'AI Enthusiast',
    'BTech CSE Student'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', typeText);

// ================================
// BACK TO TOP BUTTON
// ================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// CERTIFICATION FILTER
// ================================

const filterBtns = document.querySelectorAll('.filter-btn');
const certCards = document.querySelectorAll('.cert-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        certCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ================================
// SCROLL ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .cert-card, .edu-card, .publication-card, .solution-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================
// NAVBAR BACKGROUND ON SCROLL
// ================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ================================
// CONSOLE MESSAGE
// ================================

console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cThis portfolio was built with pure HTML, CSS, and JavaScript.', 'font-size: 14px; color: #94a3b8;');
console.log('%cFeel free to explore the code!', 'font-size: 14px; color: #10b981;');
// ================================
// LEETCODE TOGGLE FUNCTIONALITY
// ================================

// Toggle problem lists
document.querySelectorAll('.lc-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = btn.getAttribute('data-target');
        const targetList = document.getElementById(targetId);
        
        if (targetList) {
            targetList.classList.toggle('collapsed');
            btn.classList.toggle('active');
        }
    });
});

// Also toggle when clicking the header
document.querySelectorAll('.lc-difficulty-header').forEach(header => {
    header.addEventListener('click', () => {
        const btn = header.querySelector('.lc-toggle-btn');
        const targetId = btn.getAttribute('data-target');
        const targetList = document.getElementById(targetId);
        
        if (targetList) {
            targetList.classList.toggle('collapsed');
            btn.classList.toggle('active');
        }
    });
});

// Animate numbers on scroll
const lcStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.lc-stat-number');
            numbers.forEach(num => {
                const target = parseInt(num.textContent);
                if (!isNaN(target)) {
                    animateValue(num, 0, target, 1500);
                }
            });
            lcStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const lcStatsGrid = document.querySelector('.lc-stats-grid');
if (lcStatsGrid) {
    lcStatsObserver.observe(lcStatsGrid);
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeProgress);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}
// ================================
// LEETCODE C/C++ SECTION - FIXED
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Toggle functionality for C/C++ sections
    const cppExpandBtns = document.querySelectorAll('.cpp-expand-btn');
    
    cppExpandBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleCppSection(this);
        });
    });
    
    // Also toggle when clicking the header
    const cppHeaders = document.querySelectorAll('.cpp-section-header');
    
    cppHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const btn = this.querySelector('.cpp-expand-btn');
            toggleCppSection(btn);
        });
    });
    
    function toggleCppSection(btn) {
        const targetId = btn.getAttribute('data-target');
        const content = document.getElementById(targetId);
        const icon = btn.querySelector('i');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        
        if (content) {
            if (isExpanded) {
                // Collapse
                content.classList.add('collapsed');
                btn.setAttribute('aria-expanded', 'false');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                // Expand
                content.classList.remove('collapsed');
                btn.setAttribute('aria-expanded', 'true');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        }
    }
    
    // Animate stats on scroll
    const cppStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCppStats();
                cppStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const cppStatsHeader = document.querySelector('.cpp-stats-header');
    if (cppStatsHeader) {
        cppStatsObserver.observe(cppStatsHeader);
    }
    
    function animateCppStats() {
        // Animate stat numbers
        const statNumbers = document.querySelectorAll('.cpp-stat-number[data-count]');
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-count'));
            animateNumber(num, target);
        });
        
        // Animate difficulty counts
        const diffCounts = document.querySelectorAll('.cpp-diff-count[data-count]');
        diffCounts.forEach(count => {
            const target = parseInt(count.getAttribute('data-count'));
            animateNumber(count, target);
        });
    }
    
    function animateNumber(element, target) {
        if (target === 0) {
            element.textContent = '0';
            return;
        }
        
        const duration = 1500;
        const startTime = performance.now();
        const startValue = 0;
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startValue + (target - startValue) * easeProgress);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        // Reset to 0 first
        element.textContent = '0';
        requestAnimationFrame(update);
    }
    
    // Add hover effect for problem cards
    const problemCards = document.querySelectorAll('.cpp-problem-card');
    problemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

});
// ================================
// LIFE JOURNEY — FIXED LIGHTBOX
// ================================

document.addEventListener('DOMContentLoaded', function () {

    // 1. Scroll Reveal Animation for Journey Items
    const journeyItems = document.querySelectorAll('.journey-item');
    
    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                journeyObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    journeyItems.forEach(item => {
        item.classList.add('journey-hidden');
        journeyObserver.observe(item);
    });

    // 2. Image Lightbox Effect (Click to Enlarge) — FIXED
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function () {
            openLightbox(this.src);
        });
    });

    function openLightbox(src) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'journey-lightbox';
        
        // Create content
        const content = document.createElement('div');
        content.className = 'lightbox-content';
        
        // Create image
        const image = document.createElement('img');
        image.src = src;
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Append elements
        content.appendChild(image);
        content.appendChild(closeBtn);
        lightbox.appendChild(content);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Fade in
        setTimeout(() => lightbox.classList.add('active'), 10);

        // Close on clicking the dark background (not the image)
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on clicking X button
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            closeLightbox();
        });

        // Close on Escape key
        function handleEscape(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        }
        document.addEventListener('keydown', handleEscape);

        // Close function
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.removeEventListener('keydown', handleEscape);
            setTimeout(() => {
                if (lightbox.parentNode) {
                    lightbox.remove();
                }
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // 3. Video Lazy Load
    const journeyVideos = document.querySelectorAll('.journey-videos video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('preload', 'auto');
            }
        });
    }, { threshold: 0.3 });

    journeyVideos.forEach(video => {
        videoObserver.observe(video);
    });

});