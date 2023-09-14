import "./ScreenController.css";
import createNavBar from "../components/navBar/navBar";
import createSideBar from "../components/sideBar/sideBar";
import createInboxPage from "../components/inboxPage/inboxPage";
import createTodayPage from "../components/todayPage/todayPage";
import createUpcomingPage from "../components/upcomingPage/upcomingPage";

const ScreenController = () => {
    const init = () => {
        const body = document.querySelector("body");

        // Add navbar
        const navBar = createNavBar();
        body.appendChild(navBar);
        _setNavBarLogoListener();
    
        // Add sidebar
        const sideBar = createSideBar();
        body.appendChild(sideBar);
        _setItemListener();
        _setItemActive(document.querySelector("#inbox"));
    
        // Add main content
        const content = document.createElement("div");
        content.id = "content";
        body.appendChild(content);

        // Load the inbox page by default
        _loadInboxPage();
    };

    // Direct to inbox page when user clicks on the logo
    const _setNavBarLogoListener = () => {
        const logo = document.querySelector(".logo");
        logo.addEventListener("click", () => {
            const inboxItem = document.querySelector("#inbox");
            if (!inboxItem.classList.contains("sidebar-item-active")) {
                _setItemActive(inboxItem);
                _switchPage(inboxItem.id);
            }
        });
    };

    // Direct to the corresponding page when user clicks an item on the sidebar
    const _setItemListener = () => {
        const sideBarItems = document.querySelectorAll(".sidebar-item");
        sideBarItems.forEach(item => {
            item.addEventListener("click", () => {
                if (!item.classList.contains("sidebar-item-active")) {
                    _setItemActive(item);
                    _switchPage(item.id);
                }
            });
        });
    };

    // Change background of the active item
    const _setItemActive = item => {
        // Remove active states from all items first
        const items = document.querySelectorAll(".sidebar-item");
        items.forEach(i => {
            i.className = "sidebar-item";
        });
        // Append active class to selected item
        item.classList.add("sidebar-item-active");
    };

    const _switchPage = itemId => {
        if (itemId === "inbox") {
            _loadInboxPage();
        } else if (itemId === "today") {
            _loadTodayPage();
        } else if (itemId === "upcoming") {
            _loadUpcomingPage();
        }
    };

    const _loadInboxPage = () => {
        const content = document.querySelector("#content");
        if (content.lastChild) {
            content.removeChild(content.lastChild);
        }

        const inboxPage = createInboxPage();
        content.appendChild(inboxPage);

        _setInboxAddTaskButtonListener();
    };

    const _loadTodayPage = () => {
        const content = document.querySelector("#content");
        if (content.lastChild) {
            content.removeChild(content.lastChild);
        }
        content.appendChild(createTodayPage());
    };

    const _loadUpcomingPage = () => {
        const content = document.querySelector("#content");
        if (content.lastChild) {
            content.removeChild(content.lastChild);
        }
        content.appendChild(createUpcomingPage());
    }

    const _setInboxAddTaskButtonListener = () => {
        const buttons = document.querySelectorAll(".add-task-button");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                _openAddTaskDialog();
            });
        });
    }

    const _openAddTaskDialog = () => {
        console.log("add");
    }

    return {
        init,
    };
};

export default ScreenController;