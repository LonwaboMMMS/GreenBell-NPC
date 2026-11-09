// Green Bell NPC — navigation and appearance
document.addEventListener("DOMContentLoaded", () => {
  const pages = [...document.querySelectorAll("[data-page]")];
  const navItems = [...document.querySelectorAll("[data-nav]")];
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function showPage(pageName) {
    const pageExists = pages.some((page) => page.dataset.page === pageName);
    const currentPage = pageExists ? pageName : "home";

    pages.forEach((page) => {
      const isActive = page.dataset.page === currentPage;
      page.classList.toggle("active", isActive);
      page.setAttribute("aria-hidden", String(!isActive));
    });

    navItems.forEach((item) => {
      const isActive = item.dataset.nav === currentPage;
      item.classList.toggle("active", isActive);
      if (isActive) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", isDark ? "#171c15" : "#438116");
  }

  const savedTheme = localStorage.getItem("greenbell-theme");
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("greenbell-theme", nextTheme);
  });

  function routeFromHash() {
    showPage(window.location.hash.replace("#", "") || "home");
  }

  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();
  console.log("Green Bell NPC website is ready.");
});
