const menuToggleIcon = document.querySelector(".menu-toggle-icon");
const menuPanel = document.querySelector("#menu-panel");
const selectedMenuTitle = document.querySelector(".selected-menu-title");
const pageBoardNumber = document.querySelector(".page-board-number");
const nameInput = document.querySelector(".name");
const usernameInput = document.querySelector(".username");
const storageKey = "cocomelon-state";
const savedState = JSON.parse(localStorage.getItem(storageKey) || "{}");
const pageTitles = savedState.pageTitles || {};
const pageValues = new Map(Object.entries(savedState.pageValues || {}));
let selectedPage = Number(savedState.selectedPage) || 1;
let selectedMenuItem = null;

const saveState = () => {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      brandName: menuPanel.querySelector(".brand-name")?.textContent,
      pageTitles,
      pageValues: Object.fromEntries(pageValues),
      selectedPage,
    }),
  );
};

const saveCurrentPage = () => {
  pageValues.set(String(selectedPage), {
    name: nameInput.value,
    username: usernameInput.value,
  });
  saveState();
};

if (menuToggleIcon && menuPanel) {
  fetch("pages/menu.html")
    .then((response) => response.text())
    .then((menuMarkup) => {
      menuPanel.innerHTML = menuMarkup;

      const brandName = menuPanel.querySelector(".brand-name");
      const menuItems = menuPanel.querySelectorAll(".menu-item");
      selectedPage = Math.min(selectedPage, menuItems.length);
      selectedMenuItem = menuItems[selectedPage - 1] || menuItems[0];

      brandName.textContent =
        savedState.brandName || brandName.textContent.trim();

      menuItems.forEach((menuItem, index) => {
        const pageNumber = index + 1;
        const savedTitle = pageTitles[pageNumber];

        if (savedTitle) {
          menuItem.querySelector(".menu-title").textContent = savedTitle;
        }
      });

      selectedMenuTitle.textContent =
        selectedMenuItem.querySelector(".menu-title").textContent;
      pageBoardNumber.textContent = selectedPage;
      nameInput.value = pageValues.get(String(selectedPage))?.name || "";
      usernameInput.value =
        pageValues.get(String(selectedPage))?.username || "";

      brandName.addEventListener("blur", () => {
        if (!brandName.textContent.trim()) {
          brandName.textContent = "cocomelon";
        }
        saveState();
      });

      brandName.addEventListener("input", saveState);

      selectedMenuTitle.addEventListener("input", () => {
        const renamedTitle = selectedMenuTitle.textContent.trim();

        if (renamedTitle && selectedMenuItem) {
          selectedMenuItem.querySelector(".menu-title").textContent =
            renamedTitle;
          pageTitles[selectedPage] = renamedTitle;
          saveState();
        }
      });

      selectedMenuTitle.addEventListener("blur", () => {
        if (!selectedMenuTitle.textContent.trim() && selectedMenuItem) {
          selectedMenuTitle.textContent =
            selectedMenuItem.querySelector(".menu-title").textContent;
          pageTitles[selectedPage] = selectedMenuTitle.textContent;
          saveState();
        }
      });

      nameInput.addEventListener("input", saveCurrentPage);
      usernameInput.addEventListener("input", saveCurrentPage);

      menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener("click", () => {
          saveCurrentPage();

          selectedPage = index + 1;
          selectedMenuItem = menuItem;
          const pageValue = pageValues.get(String(selectedPage)) || {
            name: "",
            username: "",
          };

          selectedMenuTitle.textContent =
            menuItem.querySelector(".menu-title").textContent;
          pageBoardNumber.textContent = selectedPage;
          nameInput.value = pageValue.name;
          usernameInput.value = pageValue.username;

          menuPanel.classList.remove("is-open");
          menuPanel.setAttribute("aria-hidden", "true");
          saveState();
        });
      });

      saveState();
    });

  menuToggleIcon.addEventListener("click", () => {
    const isOpen = menuPanel.classList.toggle("is-open");
    menuPanel.setAttribute("aria-hidden", String(!isOpen));
  });
}
