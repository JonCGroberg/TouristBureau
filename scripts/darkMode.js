// Custom toggle code using boostrap functions

const icons = {
  light: "bi-sun-fill",
  dark: "bi-moon-stars-fill",
  auto: "bi-circle-half",
};

const toggleIcon = document.getElementById("toggleIcon");
const nightModeToggle = document.getElementById("nightModeToggle");
const lightButton = document.getElementById("dayButton");
const darkButton = document.getElementById("nightButton");
const autoButton = document.getElementById("autoButton");

const getStoredTheme = () => localStorage.getItem("theme");
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);
const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
const setTheme = (theme) => {
  if (
    theme === "auto" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    setStoredTheme("dark");
    for (const key in icons) {
      if (key != theme) toggleIcon.classList.remove(icons[key]);
    }
    toggleIcon.classList.add(icons[theme]);
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    setStoredTheme(theme);
    for (const key in icons) {
      if (key != theme) toggleIcon.classList.remove(icons[key]);
    }
    toggleIcon.classList.add(icons[theme]);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }
};
const showActiveTheme = (theme, focus = false) => {
  const themeSwitcher = document.querySelector("#bd-theme");

  if (!themeSwitcher) return;

  const themeSwitcherText = document.querySelector("#bd-theme-text");
  const activeThemeIcon = document.querySelector(".theme-icon-active use");
  const btnToActive = document.querySelector(
    `[data-bs-theme-value="${theme}"]`
  );
  const svgOfActiveBtn = btnToActive
    .querySelector("svg use")
    .getAttribute("href");

  document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
    element.classList.remove("active");
    element.setAttribute("aria-pressed", "false");
  });

  btnToActive.classList.add("active");
  btnToActive.setAttribute("aria-pressed", "true");
  activeThemeIcon.setAttribute("href", svgOfActiveBtn);
  const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
  themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

  if (focus) themeSwitcher.focus();
};

setTheme(getPreferredTheme());

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== "light" && storedTheme !== "dark") {
      setTheme(getPreferredTheme());
    }
  });

window.addEventListener("DOMContentLoaded", () => {
  showActiveTheme(getPreferredTheme());

  document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const theme = toggle.getAttribute("data-bs-theme-value");
      setStoredTheme(theme);
      setTheme(theme);
      showActiveTheme(theme, true);
    });
  });
});
darkButton.addEventListener("click", () => setTheme("dark"));
autoButton.addEventListener("click", () => setTheme("auto"));
lightButton.addEventListener("click", () => setTheme("light"));
