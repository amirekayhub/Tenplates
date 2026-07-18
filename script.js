// Master Media - Layout Script

function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setViewportHeight();
window.addEventListener("resize", setViewportHeight);
window.addEventListener("orientationchange", setViewportHeight);
window.addEventListener("scroll", setViewportHeight);

const main = document.querySelector(".main");
const navItems = document.querySelectorAll(".nav-item");

const pageTemplates = {
  home: `
    <div class="home">
      <div class="home-wrapper">
        <div class="home-boards">
          <div class="home-board">
            <div class="board">
              <div class="board-title">Template</div>
            </div>
            <div class="home-tag">@app</div>
          </div>
          <div class="home-board">
            <div class="board">
              <div class="board-title">Header [1]</div>
            </div>
            <div class="home-tag">@kiraforex</div>
          </div>
          <div class="home-board">
            <div class="board">
              <div class="board-title">Header [2]</div>
            </div>
            <div class="home-tag">@Untitled</div>
          </div>
        </div>
      </div>
    </div>
  `,
  profiles: `
    <div class="profiles">
      <div class="profiles-wrapper">
        <div class="profile-user">
          <div class="profile-title">User</div>
          <div class="profile-tag-text">Enter your usertag</div>
        </div>
        <div class="profile-text">
          <div class="profile-title">Untitled</div>
          <div class="profile-content">Enter your text</div>
        </div>
      </div>
    </div>
  `,
  visuals: `
    <div class="visuals">
      <div class="visuals-wrapper">
        <div class="visual-user">
          <div class="visual-title">Untitled</div>
          <div class="visual-board">
            <div class="visual-frame"></div>
            <div class="visual-action">
              <img
                class="visual-download-icon"
                src="https://i.postimg.cc/Kj7rbSh3/visual-download-icon.png"
              />
              <div class="visual-download-text">Download</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  ap: `
    <div class="ap">
      <div class="ap-wrapper">
        <div class="ap-user">
          <div class="ap-title">Untitled</div>
          <div class="ap-content">Enter your text</div>
        </div>
      </div>
    </div>
  `,
  store: `
    <div class="store">
      <div class="store-wrapper">
        <div class="store-user">
          <div class="store-title">Untitled</div>
          <div class="store-content">Enter your text</div>
        </div>
      </div>
    </div>
  `,
};

function setActiveNav(pageKey) {
  navItems.forEach((navItem) => {
    const isActive = navItem.getAttribute("data-nav") === pageKey;
    navItem.classList.toggle("active", isActive);
  });
}

function showPage(pageKey) {
  if (!main) return;
  main.innerHTML = pageTemplates[pageKey] || pageTemplates.home;
  main.scrollTop = 0;
  setActiveNav(pageKey);
}

navItems.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    const pageKey = navItem.getAttribute("data-nav");
    showPage(pageKey);
  });
});

showPage("home");
