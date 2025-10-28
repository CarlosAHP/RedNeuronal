// Infographic functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scrolling to all internal links
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
    
    // Add animation on scroll for video sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all video sections for animation
    document.querySelectorAll('.video-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add hover effects to video sections
    document.querySelectorAll('.video-section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add progress indicator for current section
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress bar based on scroll
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // Add search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar en la infografía...';
    searchInput.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 0.5rem 1rem;
        border: 2px solid #667eea;
        border-radius: 25px;
        outline: none;
        background: white;
        z-index: 1000;
        width: 250px;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
    `;
    
    document.body.appendChild(searchInput);
    
    // Show search on Ctrl+F
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchInput.style.opacity = '1';
            searchInput.style.transform = 'translateY(0)';
            searchInput.focus();
        }
    });
    
    // Hide search on Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.style.opacity = '0';
            this.style.transform = 'translateY(-20px)';
            this.value = '';
            // Clear search highlights
            document.querySelectorAll('p, li, h2, h3, h4').forEach(element => {
                element.style.backgroundColor = '';
                element.style.borderRadius = '';
                element.style.padding = '';
            });
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length < 2) {
            // Clear highlights
            document.querySelectorAll('p, li, h2, h3, h4').forEach(element => {
                element.style.backgroundColor = '';
                element.style.borderRadius = '';
                element.style.padding = '';
            });
            return;
        }
        
        const allText = document.querySelectorAll('p, li, h2, h3, h4');
        allText.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                element.style.backgroundColor = '#fff3cd';
                element.style.borderRadius = '3px';
                element.style.padding = '2px';
            } else {
                element.style.backgroundColor = '';
                element.style.borderRadius = '';
                element.style.padding = '';
            }
        });
    });
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    });
    
    document.body.appendChild(printButton);
    
    // Add loading animation
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p>Cargando infografía...</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 1000);
    });
    
    // Add video number highlighting on scroll
    let currentVideo = 0;
    const videoSections = document.querySelectorAll('.video-section');
    
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const videoNumber = entry.target.querySelector('.video-number');
                if (videoNumber) {
                    videoNumber.style.background = 'rgba(255, 255, 255, 0.3)';
                    videoNumber.style.transform = 'scale(1.1)';
                    videoNumber.style.transition = 'all 0.3s ease';
                }
            } else {
                const videoNumber = entry.target.querySelector('.video-number');
                if (videoNumber) {
                    videoNumber.style.background = 'rgba(255, 255, 255, 0.2)';
                    videoNumber.style.transform = 'scale(1)';
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    videoSections.forEach(section => {
        videoObserver.observe(section);
    });
    
    // Add keyboard navigation for video sections
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = document.querySelector('.video-section:hover');
            if (currentSection) {
                const nextSection = currentSection.nextElementSibling;
                if (nextSection && nextSection.classList.contains('video-section')) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = document.querySelector('.video-section:hover');
            if (currentSection) {
                const prevSection = currentSection.previousElementSibling;
                if (prevSection && prevSection.classList.contains('video-section')) {
                    prevSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
    
    // Add tooltip functionality for complex terms
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.9rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            this.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 300);
            });
        });
    });
});

// Add CSS for print styles
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        button, input {
            display: none !important;
        }
        
        .infographic-container {
            box-shadow: none;
            max-width: none;
        }
        
        .infographic-header {
            background: #667eea !important;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
        }
        
        .video-section {
            break-inside: avoid;
            box-shadow: none;
            border: 1px solid #ddd;
            margin-bottom: 2rem;
        }
        
        .video-header {
            background: #667eea !important;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
        }
        
        .video-content {
            background: white !important;
        }
        
        .content-card,
        .tool-card,
        .concept-card,
        .definition-card,
        .neuron-model,
        .rules,
        .code-example,
        .examples,
        .formula-card,
        .limitation-card,
        .sigmoid-info,
        .example-data,
        .calculation-steps,
        .algorithm-steps,
        .learning-rate,
        .sgd-data,
        .sgd-steps,
        .architecture,
        .calculation,
        .advantages,
        .layer-calc,
        .history,
        .algorithm,
        .cnn-features,
        .cnn-operations,
        .transfer-cases,
        .techniques,
        .sgd-advantages,
        .batch-sizes,
        .linear,
        .nonlinear,
        .innovation {
            background: #f8f9fa !important;
            border: 1px solid #ddd !important;
        }
        
        .infographic-footer {
            background: #333 !important;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
        }
    }
`;
document.head.appendChild(printStyles);
