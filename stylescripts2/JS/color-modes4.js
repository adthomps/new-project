(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  // Add a function to switch images based on the theme
  const switchImageBasedOnTheme = theme => {
    const imageContainer = document.querySelector('#imageContainer');

    // Define an object to map image IDs to their respective paths for different themes
    const imagePaths = {
      'droneimage': {
        light: '../images/icons/drone-logo3.png',
        dark: '../images/icons/drone-logo1.png',
        auto: '../images/icons/drone-logo2.png',
        // Add more themes and image paths as needed
      },
      'anetimage': {
        light: '../images/icons/anet/anet-logo1.png',
        dark: '../images/icons/anet/anet-logo2.png',
        auto: '../images/icons/anet/anet-logo2.png',
      },
      'cybsimage': {
        light: '../images/icons/cybs/cybersource-logo4.png',
        dark: '../images/icons/cybs/cybersource-logo6.png',
        auto: '../images/icons/cybs/cybersource-logo6.png',
      },
      'cardimage': {
        light: '../images/icons/cybs/cardinal-logo2.png',
        dark: '../images/icons/cybs/cardinal-logo1.png',
        auto: '../images/icons/cybs/cardinal-logo1.png',
      }
      // Add more image IDs and their associated themes and image paths
    };

    // Get the image elements by their IDs
    for (const imageId in imagePaths) {
      if (imagePaths.hasOwnProperty(imageId)) {
        const image = document.querySelector(`#${imageId}`);
        if (image) {
          const imagePath = imagePaths[imageId][theme] || imagePaths[imageId]['auto'];
          image.src = imagePath;
        }
      }
    }
  };

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
          // Call the function to switch images
          switchImageBasedOnTheme(theme);
        });
      });
  });
})();