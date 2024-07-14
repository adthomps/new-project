document.addEventListener("DOMContentLoaded", function () {
  // Adjust paths for header and footer
  const headerPath = getRelativePath("../templates/header.html");
  const footerPath = getRelativePath("../templates/footer.html");

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