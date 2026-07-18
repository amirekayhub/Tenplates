// Master Media - Layout Script

// Viewport Height Fix for Mobile
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setViewportHeight();
window.addEventListener("resize", setViewportHeight);
window.addEventListener("orientationchange", setViewportHeight);
window.addEventListener("scroll", setViewportHeight);

// Page Registry
const pages = {
  home: document.getElementById("page-home"),
};

// Show / Hide Helpers
function hideAllPages() {
  Object.values(pages).forEach((page) => {
    if (page) page.style.display = "none";
  });
}

function showPage(page) {
  if (!page) return;
  hideAllPages();
  page.style.display = "block";
  const main = document.querySelector(".main");
  if (main) main.scrollTop = 0;
}

// Footer Navigation
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((n) => n.classList.remove("active"));
    navItem.classList.add("active");

    const navType = navItem.getAttribute("data-nav");
    const target = pages[navType];

    if (target) showPage(target);
  });
});

// Header Buttons
const headerProfile = document.getElementById("header-profile");
if (headerProfile) {
  headerProfile.addEventListener("click", () => {
    console.log("header-profile tapped");
  });
}

const headerNotiBtn = document.getElementById("header-noti-btn");
if (headerNotiBtn) {
  headerNotiBtn.addEventListener("click", () => {
    console.log("notifications tapped");
  });
}

const headerStoreBtn = document.getElementById("header-store-btn");
if (headerStoreBtn) {
  headerStoreBtn.addEventListener("click", () => {
    console.log("store tapped");
  });
}

// Initialize - Show Home Page
showPage(pages.home);

const homeNav = document.querySelector('.nav-item[data-nav="home"]');
if (homeNav) homeNav.classList.add("active");
