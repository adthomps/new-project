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