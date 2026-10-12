(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navList = document.getElementById('main-nav');

    if (menuToggle && navList) {
      function setOpen(open) {
        navList.classList.toggle('nav--open', open);
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      }

      menuToggle.addEventListener('click', function() {
        setOpen(!navList.classList.contains('nav--open'));
      });

      // Escape closes the menu and puts focus back on the toggle button.
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navList.classList.contains('nav--open')) {
          setOpen(false);
          menuToggle.focus();
        }
      });
    }
  });
})();
