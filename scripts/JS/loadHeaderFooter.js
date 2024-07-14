document.addEventListener('DOMContentLoaded', function() {
  loadHeaderFooter();
});

function loadHeaderFooter() {
  // Determine the base path depending on the depth of the page in the directory hierarchy
  const basePath = location.pathname.includes('/anet/') || location.pathname.includes('/cybs/') || location.pathname.includes('/maps/') ? '..' : '.';

  fetch(`${basePath}/templates/header.html`)
    .then(response => response.text())
    .then(data => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        headerElement.innerHTML = data;
        adjustPaths(headerElement, basePath);
      }
    })
    .catch(error => console.error('Error loading header:', error));

  fetch(`${basePath}/templates/footer.html`)
    .then(response => response.text())
    .then(data => {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        footerElement.innerHTML = data;
        adjustPaths(footerElement, basePath);
      }
    })
    .catch(error => console.error('Error loading footer:', error));
}

function adjustPaths(element, basePath) {
  if (element) {
    // Adjust the paths for links
    const links = element.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        link.setAttribute('href', `${basePath}/${href}`);
      }
    });

    // Adjust the paths for images
    const images = element.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http')) {
        img.setAttribute('src', `${basePath}/${src}`);
      }
    });
  }
}
