(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navList = document.getElementById('main-nav');
    
    if (menuToggle && navList) {
      menuToggle.addEventListener('click', function() {
        const isOpen = navList.classList.toggle('nav--open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  });
})();
