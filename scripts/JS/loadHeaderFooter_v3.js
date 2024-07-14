document.addEventListener("DOMContentLoaded", function () {
  // Adjust paths for header and footer
  const headerPath = getRelativePath("templates/header.html");
  const footerPath = getRelativePath("templates/footer.html");

  loadHTML(headerPath, "header");
  loadHTML(footerPath, "footer");
});

function getRelativePath(filePath) {
  const currentPath = window.location.pathname;
  const depth = currentPath.split("/").length - 3; // Adjust this based on your structure
  let relativePath = "";
  for (let i = 0; i < depth; i++) {
    relativePath += "../";
  }
  return relativePath + filePath;
}

function loadHTML(file, elementId) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      adjustLinks(); // Adjust links after loading
    })
    .catch(error => {
      console.error('Error fetching the HTML file:', error);
    });
}

function adjustLinks() {
  const currentPath = window.location.pathname;
  const depth = currentPath.split("/").length - 2;
  let relativePath = "";
  for (let i = 0; i < depth; i++) {
    relativePath += "../";
  }

  // Adjust all anchor links
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#')) {
      link.setAttribute('href', relativePath + href);
    }
  });

  // Adjust all image sources
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('#')) {
      img.setAttribute('src', relativePath + src);
    }
  });
}