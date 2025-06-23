// Add this JavaScript code without modifying the existing HTML structure

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const nav = header.querySelector('nav');
    const franchiseButton = header.querySelector('button');
    
    // Create mobile menu button (hamburger)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
    mobileMenuButton.innerHTML = `
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    mobileMenuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        padding: 10px;
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1000;
    `;

    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        max-width: 300px;
        height: 100vh;
        background: #FE5D0A;
        padding: 80px 20px 20px;
        transition: right 0.3s ease;
        z-index: 999;
        overflow-y: auto;
    `;

    // Clone navigation items for mobile menu
    const mobileNav = nav.cloneNode(true);
    mobileNav.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
    `;
    
    // Clone franchise button for mobile menu
    const mobileFranchiseButton = franchiseButton.cloneNode(true);
    mobileFranchiseButton.style.marginTop = '20px';

    // Add elements to mobile menu
    mobileMenu.appendChild(mobileNav);
    mobileMenu.appendChild(mobileFranchiseButton);

    // Add mobile elements to DOM
    header.appendChild(mobileMenuButton);
    document.body.appendChild(mobileMenu);

    // Style hamburger icon
    const hamburgerStyle = document.createElement('style');
    hamburgerStyle.textContent = `
        .hamburger span {
            display: block;
            width: 25px;
            height: 3px;
            background-color: #fff;
            margin: 5px 0;
            border-radius: 3px;
            transition: 0.3s;
        }
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        @media (max-width: 768px) {
            header nav, 
            header > button {
                display: none !important;
            }
            .mobile-menu-button {
                display: block !important;
            }
        }
    `;
    document.head.appendChild(hamburgerStyle);

    // Toggle mobile menu
    let isMenuOpen = false;
    mobileMenuButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenuButton.querySelector('.hamburger').classList.toggle('active');
        mobileMenu.style.display = 'block';
        mobileMenu.style.right = isMenuOpen ? '0' : '-100%';
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.style.right = '-100%';
            mobileMenuButton.querySelector('.hamburger').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.style.right = '-100%';
            mobileMenuButton.querySelector('.hamburger').classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add media queries for responsive sections
    const responsiveStyle = document.createElement('style');
    responsiveStyle.textContent = `
        @media (max-width: 768px) {
            .w-full > div {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            
            .flex.justify-between {
                flex-direction: column;
                gap: 30px;
            }
            
            .flex.justify-between > div {
                width: 100% !important;
            }
            
            img {
                max-width: 100%;
                height: auto;
            }
            
            h1, h2 {
                font-size: 32px !important;
                line-height: 1.2 !important;
            }
            
            footer .flex.justify-between {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
            footer .flex.justify-between > div {
                margin-bottom: 30px;
            }
        }
    `;
    document.head.appendChild(responsiveStyle);
});
