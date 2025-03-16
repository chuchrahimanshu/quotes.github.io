// THEME FUNCTIONALITY IMPLEMENTATION
const themeButton = document.getElementById("theme-btn");

function handleThemeToggle() {
  const DARK_MODE = "🌝";
  const LIGHT_MODE = "🌚";
  const DARK_BACKGROUND = "#111111";
  const LIGHT_BACKGROUND = "#eeeeee";
  const DARK_TEXT = "#FFFFFF";
  const LIGHT_TEXT = "#000000";
  const DARK_OVERLAY = "#222222";
  const LIGHT_OVERLAY = "#cccccc";

  const currentTheme = themeButton.textContent;

  if (currentTheme == DARK_MODE) {
    themeButton.textContent = LIGHT_MODE;
    document.documentElement.style.setProperty(
      "--background-color",
      LIGHT_BACKGROUND
    );
    document.documentElement.style.setProperty(
      "--overlay-color",
      LIGHT_OVERLAY
    );
    document.documentElement.style.setProperty("--text-color", LIGHT_TEXT);
  } else {
    themeButton.textContent = DARK_MODE;
    document.documentElement.style.setProperty(
      "--background-color",
      DARK_BACKGROUND
    );
    document.documentElement.style.setProperty("--overlay-color", DARK_OVERLAY);
    document.documentElement.style.setProperty("--text-color", DARK_TEXT);
  }
}

themeButton.addEventListener("click", handleThemeToggle);
