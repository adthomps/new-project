async function loadTemplate(elementId, templatePath) {
    try {
        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const template = await response.text();
        document.getElementById(elementId).innerHTML = template;
    } catch (error) {
        console.error(`Failed to load template ${templatePath}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadTemplate('header', 'templates/header.html');
    await loadTemplate('nav', 'templates/nav.html');
    await loadTemplate('footer', 'templates/footer.html');
});

function toggleMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    // Toggle the stylesheet for light and dark mode
    var modeStyle = document.getElementById('mode-style');
    if (element.classList.contains("dark-mode")) {
        modeStyle.setAttribute('href', 'css/dark-mode.css');
    } else {
        modeStyle.setAttribute('href', 'css/light-mode.css');
    }
}
