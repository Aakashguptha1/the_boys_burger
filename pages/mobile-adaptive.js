// mobile-adaptive.js
// This script adapts navigation and layout for mobile screens

document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile Navigation: Hamburger menu
    const header = document.querySelector('header');
    if (!header) return;

    // Create hamburger for mobile
    const hamburger = document.createElement('button');
    hamburger.setAttribute('aria-label', 'Open Navigation');
    hamburger.innerHTML = `
        <span style="display:block;width:26px;height:4px;background:#fff;margin:4px 0;border-radius:2px"></span>
        <span style="display:block;width:26px;height:4px;background:#fff;margin:4px 0;border-radius:2px"></span>
        <span style="display:block;width:26px;height:4px;background:#fff;margin:4px 0;border-radius:2px"></span>
    `;
    hamburger.style.display = 'none';
    hamburger.style.background = 'transparent';
    hamburger.style.border = 'none';
    hamburger.style.cursor = 'pointer';
    hamburger.style.padding = '4px';
    hamburger.style.outline = 'none';
    hamburger.classList.add('mobile-nav-hamburger');

    // Grab nav and button
    const nav = header.querySelector('nav');
    const navButton = header.querySelector('button');

    // Mobile nav panel
    const mobileNav = document.createElement('div');
    mobileNav.style.position = 'fixed';
    mobileNav.style.top = '0';
    mobileNav.style.right = '0';
    mobileNav.style.width = '80vw';
    mobileNav.style.maxWidth = '320px';
    mobileNav.style.height = '100vh';
    mobileNav.style.background = '#2d2727ee';
    mobileNav.style.zIndex = '9999';
    mobileNav.style.transform = 'translateX(100%)';
    mobileNav.style.transition = 'transform 0.3s';
    mobileNav.style.display = 'flex';
    mobileNav.style.flexDirection = 'column';
    mobileNav.style.padding = '32px 24px';
    mobileNav.style.boxShadow = '-2px 0 32px rgba(0,0,0,0.3)';
    mobileNav.innerHTML = `
        <button aria-label="Close Navigation" style="background:none;border:none;align-self:flex-end;font-size:2rem;color:#fff;cursor:pointer">&times;</button>
    `;

    // Add nav links
    const navClone = nav.cloneNode(true);
    navClone.style.display = 'flex';
    navClone.style.flexDirection = 'column';
    navClone.style.gap = '24px';
    navClone.querySelectorAll('a').forEach(a => {
        a.style.fontSize = '20px';
        a.style.color = '#fff';
        a.style.textAlign = 'left';
        a.style.margin = '0';
        a.style.padding = '0';
        a.style.fontWeight = '500';
    });
    // Franchise button
    const btnClone = navButton.cloneNode(true);
    btnClone.style.width = '100%';
    btnClone.style.marginTop = '32px';

    mobileNav.appendChild(navClone);
    mobileNav.appendChild(btnClone);

    document.body.appendChild(mobileNav);

    // Hamburger toggle logic
    hamburger.addEventListener('click', () => {
        mobileNav.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    });
    mobileNav.querySelector('button[aria-label="Close Navigation"]').addEventListener('click', () => {
        mobileNav.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
    });

    // Insert hamburger
    header.insertBefore(hamburger, nav);
    
    // 2. Detect screen size & toggle elements
    function updateForMobile() {
        if (window.innerWidth <= 900) {
            nav.style.display = 'none';
            navButton.style.display = 'none';
            hamburger.style.display = 'block';
        } else {
            nav.style.display = '';
            navButton.style.display = '';
            hamburger.style.display = 'none';
            mobileNav.style.transform = 'translateX(100%)';
            document.body.style.overflow = '';
        }
    }
    window.addEventListener('resize', updateForMobile);
    updateForMobile();

    // 3. Add smooth scroll to anchor links (optional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({behavior: 'smooth'});
                mobileNav.style.transform = 'translateX(100%)';
                document.body.style.overflow = '';
            }
        });
    });
});