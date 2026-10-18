/* ==========================================================================
   Banti Avchhare - Portfolio Scripts
   ========================================================================== */

// 1. Tailwind CSS Configuration (read automatically by Tailwind CDN)
tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0c1218",
          card: "#131b24",
          surface: "#18222e",
          coral: "#ff6243",
          "coral-hover": "#ff795e",
          muted: "#7e8b9b",
          border: "#1f2d3d"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  }
};

// 2. Interactive DOM Behaviors
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });

    // Close mobile drawer when clicking any link inside it
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });

    // Close mobile drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  }

  // Contact Form: WhatsApp Redirect with loaded form data
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        if (contactForm.reportValidity) {
          contactForm.reportValidity();
        } else {
          alert('Please complete all fields before sending.');
        }
        return;
      }

      // Build prefilled WhatsApp message addressed to Banti
      const whatsappText = `Hello Banti,\n\nI reached out via your portfolio website.\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;
      const whatsappUrl = `https://wa.me/917697769530?text=${encodeURIComponent(whatsappText)}`;

      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');
    });
  }
});
