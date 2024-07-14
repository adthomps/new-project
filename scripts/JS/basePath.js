document.addEventListener("DOMContentLoaded", function () {
  const basePath = window.location.pathname.split("/").slice(0, -1).join("/") + "/";
  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("http") && !href.startsWith("#")) {
      link.setAttribute("href", basePath + href);
    }
  });
  document.querySelectorAll("img").forEach(img => {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("http") && !src.startsWith("#")) {
      img.setAttribute("src", basePath + src);
    }
  });
});
