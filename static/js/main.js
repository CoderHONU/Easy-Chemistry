// ==========================================================================
// Global Variables & Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    initGSAP();
    initNavbar();
    initLoadingScreen();
    initScrollAnimations();
    initStatsCounter();
    initTypingAnimation();
    initContactForm();
    initModal();
    initThemeToggle();
});

// ==========================================================================
// GSAP Initialization & Scroll Animations
// ==========================================================================
function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    gsap.from('.hero-title .char', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.5
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1.2,
        ease: 'power2.out'
    });
    
    gsap.from('.hero-cta .cta-primary', {
        duration: 0.8,
        scale: 0.9,
        opacity: 0,
        delay: 1.5,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.hero-cta .cta-secondary', {
        duration: 0.8,
        scale: 0.9,
        opacity: 0,
        delay: 1.7,
        ease: 'back.out(1.7)'
    });
    
    // Section reveal animations
    gsap.utils.toArray('section').forEach((section, i) => {
        gsap.from(section.children, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });
}

// ==========================================================================
// Loading Screen
// ==========================================================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Animate liquid fill and H2O text
    setTimeout(() => {
        document.querySelector('.liquid-level').style.animation = 'fillBeaker 2s ease-out forwards';
    }, 1000);
    
    setTimeout(() => {
        gsap.to(loadingScreen, {
            duration: 1,
            opacity: 0,
            ease: 'power2.inOut',
            onComplete: () => {
                loadingScreen.style.display = 'none';
                mainContent.style.opacity = '1';
            }
        });
    }, 4000);
}

// ==========================================================================
// Navbar Functionality
// ==========================================================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ==========================================================================
// Smooth Scrolling & Active Nav Links
// ==========================================================================
function initScrollAnimations() {
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
    
    // Update active nav link
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================================================
// Stats Counter Animation
// ==========================================================================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const count = parseInt(stat.innerText);
            const increment = target / 100;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(() => requestAnimationFrame(animateStats), 30);
            } else {
                stat.innerText = target;
            }
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelector('.stats-grid').parentElement && observer.observe(document.querySelector('.stats-grid'));
}

// ==========================================================================
// Typing Animation (Enhanced)
function initTypingAnimation() {
    const chars = document.querySelectorAll('.typing-animation .char');
    chars.forEach((char, index) => {
        gsap.to(char, {
            duration: 0.6,
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            delay: index * 0.05
        });
    });
}

// ==========================================================================
// Contact Form
// ==========================================================================
// ==========================================================================
// ==========================================================================
// Contact Form - CLEAN PERFECT WHATSAPP
// ==========================================================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameField = form.querySelector('input[placeholder="Your Name"]');
        const phoneField = form.querySelector('input[placeholder="Phone Number"]');
        const emailField = form.querySelector('input[placeholder="Email (Optional)"]');
        const courseField = form.querySelector('select');
        
        const name = nameField.value.trim();
        const phone = phoneField.value.trim();
        const email = emailField.value.trim();
        const course = courseField.options[courseField.selectedIndex].text;
        
        if (!name || !phone || !course || course === 'Select Course') {
            gsap.to([nameField, phoneField, courseField], {
                x: 10, duration: 0.1, yoyo: true, repeat: 3, ease: 'power2.inOut'
            });
            alert('⚠️ Please fill all required fields');
            return;
        }
        
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(cleanPhone)) {
            alert('⚠️ Enter valid 10-digit phone');
            phoneField.focus();
            return;
        }
        
        // CLEAN WhatsApp Message - Perfect alignment, no asterisks
        const message = `NEW STUDENT INQUIRY - Easy Chemistry by S.P. Sir\n\n` +
                       `Name     : ${name}\n` +
                       `Phone    : +91 ${phone}\n` +
                       `Email    : ${email || 'Not provided'}\n` +
                       `Course   : ${course}\n\n` +
                       `Status   : Ready to join!\n` +
                       `Time     : ${new Date().toLocaleString('en-IN', { 
                           timeZone: 'Asia/Kolkata',
                           weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                           hour: '2-digit', minute: '2-digit', hour12: true
                       })}\n\n` +
                       `--- Please reply to confirm ---`;
        
        const whatsappNumber = '919475962996';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        gsap.to(form.querySelector('button[type="submit"]'), {
            scale: 0.95, duration: 0.1, yoyo: true, repeat: 1
        });
        
        window.open(whatsappURL, '_blank');
        
        gsap.to(form, {
            scale: 0.95, duration: 0.2, yoyo: true, repeat: 1,
            onComplete: () => {
                form.reset();
                
                const successMsg = document.createElement('div');
                successMsg.innerHTML = '✅ Sent Successfully!';
                successMsg.style.cssText = `
                    position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#00d4ff,#0099cc);
                    color:white;padding:15px 25px;border-radius:12px;box-shadow:0 8px 25px rgba(0,212,255,0.3);
                    font-weight:600;z-index:10000;max-width:220px;text-align:center;transform:scale(0);
                `;
                document.body.appendChild(successMsg);
                
                gsap.fromTo(successMsg, {scale:0,y:30,opacity:0}, {scale:1,y:0,opacity:1,duration:0.4,ease:'back.out(1.7)'});
                setTimeout(() => gsap.to(successMsg, {scale:0,opacity:0,duration:0.3,onComplete:()=>successMsg.remove()}), 2500);
            }
        });
    });
    
    const phoneField = form.querySelector('input[placeholder="Phone Number"]');
    phoneField.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 10);
        e.target.value = value;
    });
    
    form.querySelector('input[placeholder="Your Name"]').focus();
}


// ==========================================================================
// Theme Toggle
// ==========================================================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const isDark = localStorage.getItem('theme') !== 'light';
    
    if (!isDark) {
        document.body.classList.add('light-theme');
        themeToggle.classList.add('light');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        themeToggle.classList.toggle('light');
        
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// ==========================================================================
// Periodic Table Modal
// ==========================================================================
function initModal() {
    const modal = document.getElementById('periodicTableModal');
    const closeBtn = document.querySelector('.close');
    
    // Add periodic table trigger somewhere in HTML if needed
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('periodic-table-trigger')) {
            modal.style.display = 'block';
        }
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ==========================================================================
// Performance Optimizations
// ==========================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}

// Preload critical assets
const links = [
    'static/images/sp-sir.jpg'
];

links.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
});
