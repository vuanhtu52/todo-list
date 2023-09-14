import "./ScreenController.css";
import createNavBar from "../navBar/navBar";
import createSideBar from "../sideBar/sideBar";
import createInboxPage from "../inboxPage/inboxPage";
import createTodayPage from "../todayPage/todayPage";
import createUpcomingPage from "../upcomingPage/upcomingPage";

const ScreenController = () => {
    const init = () => {
        const body = document.querySelector("body");

        // Add navbar
        const navBar = createNavBar();
        body.appendChild(navBar);
    
        // Add sidebar
        const sideBar = createSideBar();
        body.appendChild(sideBar);
        _setItemListener();
    
        // Add main content
        const content = document.createElement("div");
        content.id = "content";

        // Load the inbox page by default
        const inboxPage = createInboxPage();
        content.appendChild(inboxPage);

        body.appendChild(content);
    };

    // Attach a listener to each item on the sidebar
    const _setItemListener = () => {
        const sideBarItems = document.querySelectorAll(".sidebar-item");
        sideBarItems.forEach(item => {
            item.addEventListener("click", () => {
                _setItemActive(item);
                _switchPage(item.id);
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
        const content = document.querySelector("#content");
        content.removeChild(content.lastChild);
        if (itemId === "inbox") {
            content.appendChild(createInboxPage());
        } else if (itemId === "today") {
            content.appendChild(createTodayPage());
        } else if (itemId === "upcoming") {
            content.appendChild(createUpcomingPage());
        }
    };

    return {
        init,
    }
};

export default ScreenController;