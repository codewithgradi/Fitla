document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('#navbar ul');

    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for stats animation
    const statsSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = [
        { category: 'tournaments', img: '../images/marchmadness.webp', title: 'March Madness 2024' },
        { category: 'tournaments', img: '../images/ukznball.jpg', title: 'SA Provincial Tournament 2024' },
        { category: 'tournaments', img: '../images/fmwc.webp', title: 'SA Provincial Girls Tournament 2024' },
        { category: 'tournaments', img: '../images/kwadukuza.jpg', title: 'Kwadukuza Tournament' },
        { category: 'leagues', img: '../images/mleague.jpg', title: 'Male League' },
        { category: 'behind-scenes', img: '../images/practice.webp', title: 'Set Up' },
        { category: 'tournaments', img: '../images/chi.webp', title: 'KOTC Tournament 2024' },
        { category: 'leagues', img: '../images/fmleague.jpg', title: 'Female League' },
        { category: 'behind-scenes', img: '../images/bhs.jpg', title: 'Always On the Scene' }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    
    function renderGallery(filter = 'all') {
        galleryGrid.innerHTML = '';
        
        const filteredItems = filter === 'all' 
            ? galleryItems 
            : galleryItems.filter(item => item.category === filter);
            
        filteredItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', item.category);
            
            galleryItem.innerHTML = `
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                <div class="overlay">
                    <h3>${item.title}</h3>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderGallery(this.dataset.filter);
        });
    });
    
    // Initial gallery render
    renderGallery();

    // Events Tab System
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Populate Events Table
    const eventsTable = document.querySelector('.events-table');
    const upcomingEvents = [
        { date: '2025-08-15', name: 'KOTC', location: 'TBC' },
        { date: '2025-09-20', name: 'March Madness', location: 'UKZN Howard Gate 4' },
        { date: '2024-08-05', name: 'Varsity League', location: 'TBC' }
    ];
    
    upcomingEvents.forEach(event => {
        const eventRow = document.createElement('div');
        eventRow.className = 'event-row';
        
        const dateObj = new Date(event.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        eventRow.innerHTML = `
            <div>${formattedDate}</div>
            <div>${event.name}</div>
            <div>${event.location}</div>
            <div><button class="register-btn">Register</button></div>
        `;
        
        eventsTable.appendChild(eventRow);
    });

    // Populate Past Winners
    const pastWinners = document.querySelector('.past-winners');
    const pastEvents = [
        { img: '../images/3pointer.webp', name: 'KOTC', event: 'King Of The Court 3 Point Contest' },
        { img: '../images/chi.webp', name: 'KOTC', event: 'King Of The Court 3v3' },
        { img: '../images/marchmadness.webp', name: 'March Madness', event: 'Over 35 March Madness Tournament' }
    ];
    
    pastEvents.forEach(winner => {
        const winnerCard = document.createElement('div');
        winnerCard.className = 'winner-card';
        
        winnerCard.innerHTML = `
            <img src="${winner.img}" alt="${winner.name}" loading="lazy">
            <div class="winner-info">
                <h3>${winner.name}</h3>
                <p>${winner.event}</p>
            </div>
        `;
        
        pastWinners.appendChild(winnerCard);
    });

    // Form Submissions
    const newsletterForm = document.getElementById('newsletter-form');
    const volunteerForm = document.getElementById('volunteer-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        alert(`Thanks for subscribing with ${email}! You'll receive updates about upcoming events.`);
        this.reset();
    });
    
    volunteerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest in volunteering! We\'ll contact you soon.');
        this.reset();
    });

    // Lazy Load Images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});