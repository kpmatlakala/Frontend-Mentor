// accordion.js

export function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isActive = accordionItem.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      // Open clicked
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });

  // Open the first by default
  const first = document.querySelector('.accordion-item');
  if (first) {
    first.classList.add('active');
  }
}
