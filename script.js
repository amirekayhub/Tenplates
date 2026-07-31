const menuToggleIcon = document.querySelector(".menu-toggle-icon");
const menuPanel = document.querySelector("#menu-panel");
const selectedMenuTitle = document.querySelector(".selected-menu-title");
const pageBoards = document.querySelector("#page-boards");
const storageKey = "cocomelon-state";
const savedState = JSON.parse(localStorage.getItem(storageKey) || "{}");
const pageTitles = savedState.pageTitles || {};
const boardValues = savedState.boardValues || {};

if (savedState.pageValues) {
  Object.entries(savedState.pageValues).forEach(([pageNumber, values]) => {
    boardValues[pageNumber] = boardValues[pageNumber] || {
      1: values,
    };
  });
}

let selectedPage = Number(savedState.selectedPage) || 1;
let selectedMenuItem = null;
const maxEditableCharacters = 12;

const addLongPressEditing = (element, onInput, onBlur) => {
  let longPressTimer;

  const stopLongPress = () => {
    clearTimeout(longPressTimer);
  };

  element.addEventListener("pointerdown", () => {
    longPressTimer = setTimeout(() => {
      element.contentEditable = "true";
      element.classList.add("is-editing");
      element.focus();
    }, 600);
  });
  element.addEventListener("pointerup", stopLongPress);
  element.addEventListener("pointercancel", stopLongPress);
  element.addEventListener("pointerleave", stopLongPress);
  element.addEventListener("blur", () => {
    element.textContent = element.textContent
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maxEditableCharacters);
    element.contentEditable = "false";
    element.classList.remove("is-editing");
    onBlur();
  });
  element.addEventListener("input", () => {
    if (element.textContent.length > maxEditableCharacters) {
      element.textContent = element.textContent.slice(0, maxEditableCharacters);
    }
    onInput();
  });
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      element.blur();
    }
  });
};

const createBoards = () => {
  const boardTemplate = pageBoards.querySelector(".page-board");

  for (let boardNumber = 2; boardNumber <= 10; boardNumber += 1) {
    const board = boardTemplate.cloneNode(true);
    board.dataset.boardNumber = boardNumber;
    board.querySelector(".page-board-number").textContent = boardNumber;
    board.querySelector(".name").value = "";
    board.querySelector(".username").value = "";
    pageBoards.appendChild(board);
  }
};

const getBoardsForPage = () =>
  Array.from(pageBoards.querySelectorAll(".page-board"));

const saveState = () => {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      brandName: menuPanel.querySelector(".brand-name")?.textContent,
      pageTitles,
      boardValues,
      selectedPage,
    }),
  );
};

const saveCurrentBoards = () => {
  boardValues[selectedPage] = {};

  getBoardsForPage().forEach((board) => {
    boardValues[selectedPage][board.dataset.boardNumber] = {
      name: board.querySelector(".name").value,
      username: board.querySelector(".username").value,
    };
  });

  saveState();
};

const loadCurrentBoards = () => {
  const savedBoards = boardValues[selectedPage] || {};

  getBoardsForPage().forEach((board) => {
    const values = savedBoards[board.dataset.boardNumber] || {};
    board.querySelector(".name").value = values.name || "";
    board.querySelector(".username").value = values.username || "";
  });
};

if (menuToggleIcon && menuPanel) {
  createBoards();

  fetch("pages/menu.html")
    .then((response) => response.text())
    .then((menuMarkup) => {
      menuPanel.innerHTML = menuMarkup;

      const brandName = menuPanel.querySelector(".brand-name");
      const menuItems = menuPanel.querySelectorAll(".menu-item");
      selectedPage = Math.min(selectedPage, menuItems.length);
      selectedMenuItem = menuItems[selectedPage - 1] || menuItems[0];

      brandName.textContent = (savedState.brandName || brandName.textContent)
        .trim()
        .slice(0, maxEditableCharacters);

      menuItems.forEach((menuItem, index) => {
        const pageNumber = index + 1;
        const savedTitle = pageTitles[pageNumber];

        if (savedTitle) {
          menuItem.querySelector(".menu-title").textContent = savedTitle
            .trim()
            .slice(0, maxEditableCharacters);
        }
      });

      selectedMenuTitle.textContent =
        selectedMenuItem.querySelector(".menu-title").textContent;
      loadCurrentBoards();

      addLongPressEditing(brandName, saveState, () => {
        if (!brandName.textContent.trim()) {
          brandName.textContent = "cocomelon";
        }
        saveState();
      });

      addLongPressEditing(
        selectedMenuTitle,
        () => {
          const renamedTitle = selectedMenuTitle.textContent.trim();

          if (renamedTitle && selectedMenuItem) {
            selectedMenuItem.querySelector(".menu-title").textContent =
              renamedTitle;
            pageTitles[selectedPage] = renamedTitle;
            saveState();
          }
        },
        () => {
          if (!selectedMenuTitle.textContent.trim() && selectedMenuItem) {
            selectedMenuTitle.textContent =
              selectedMenuItem.querySelector(".menu-title").textContent;
          }
          pageTitles[selectedPage] = selectedMenuTitle.textContent;
          saveState();
        },
      );

      getBoardsForPage().forEach((board) => {
        board
          .querySelector(".name")
          .addEventListener("input", saveCurrentBoards);
        board
          .querySelector(".username")
          .addEventListener("input", saveCurrentBoards);
      });

      menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener("click", () => {
          saveCurrentBoards();

          selectedPage = index + 1;
          selectedMenuItem = menuItem;

          selectedMenuTitle.textContent =
            menuItem.querySelector(".menu-title").textContent;
          loadCurrentBoards();

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
