document.addEventListener("DOMContentLoaded", function () {
  loadHTML("templates/header.html", "header");
  loadHTML("templates/footer.html", "footer");
});

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
    })
    .catch(error => {
      console.error('Error fetching the HTML file:', error);
    });
}