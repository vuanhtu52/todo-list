import createNavBar from "../components/navBar/navBar";
import createSideBar from "../components/sideBar/sideBar";
import createInboxPage from "../components/inboxPage/inboxPage";
import createTodayPage from "../components/todayPage/todayPage";
import createUpcomingPage from "../components/upcomingPage/upcomingPage";
import createAddTaskCard from "../components/addTaskCard/addTaskCard";
import createAddProjectDialog from "../components/addProjectDialog/addProjectDialog";
import DatabaseController from "./DatabaseController";

const ScreenController = () => {
    const databaseController = DatabaseController();

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
        _setItemActive(document.querySelector("#Inbox"));
        _setAddProjectButtonListener();

        // Add main content
        const content = document.createElement("div");
        content.id = "content";
        body.appendChild(content);

        // Add add-project dialog for later use
        const addProjectDialog = createAddProjectDialog();
        body.appendChild(addProjectDialog);
        _setAddProjectDialogListener();
        _setAddProjectDialogInput();
        _setAddProjectDialogCancelButton();
        _setAddProjectDialogAddButton();

        // Load the inbox page by default
        _loadInboxPage();
    };

    // NAVBAR

    // Direct to inbox page when user clicks on the logo
    const _setNavBarLogoListener = () => {
        const logo = document.querySelector(".logo");
        logo.addEventListener("click", () => {
            const inboxItem = document.querySelector("#Inbox");
            if (!inboxItem.classList.contains("sidebar-item-active")) {
                _setItemActive(inboxItem);
                _switchPage(inboxItem.id);
            }
        });
    };

    //SIDEBAR

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
        if (itemId === "Inbox") {
            _loadInboxPage();
        } else if (itemId === "Today") {
            _loadTodayPage();
        } else if (itemId === "Upcoming") {
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
    };

    // ADD-PROJECT DIALOG

    // Attach listener to the add-project button on the side bar
    const _setAddProjectButtonListener = () => {
        const addProjectButton = document.querySelector(".add-project-button");
        addProjectButton.addEventListener("click", () => {
            _openAddProjectDialog();
        });
    };

    const _openAddProjectDialog = () => {
        const dialog = document.querySelector(".add-project-dialog");
        dialog.classList.remove("hidden");
        dialog.showModal();
        // Prevent scrolling
        document.body.style.overflow = "hidden";
        // Reset input's content and any error message
        const input = document.querySelector(".add-project-dialog input");
        input.value = "";
        const errorMessage = document.querySelector(".add-project-dialog .error-message");
        errorMessage.textContent = "";
    };

    const _closeAddProjectDialog = () => {
        const dialog = document.querySelector(".add-project-dialog");
        dialog.close();
    };

    // Attach listener to add-project dialog to detect when it closes
    const _setAddProjectDialogListener = () => {
        const dialog = document.querySelector(".add-project-dialog");
        dialog.addEventListener("close", () => {
            // Enable scrolling again
            document.body.style.overflow = "auto";
        });
    };

    // Attach listener to cancel button in add-project dialog
    const _setAddProjectDialogCancelButton = () => {
        const button = document.querySelector(".add-project-dialog .cancel-button");
        button.addEventListener("click", () => {
            _closeAddProjectDialog();
        });
    };

    // Detect when user is typing the project's name to input and verify it
    const _setAddProjectDialogInput = () => {
        const input = document.querySelector(".add-project-dialog input");
        input.addEventListener("input", () => {
            const nameResult = _verifyProjectName(input.value);
            const addButton = document.querySelector(".add-project-dialog .add-button");
            const errorMessage = document.querySelector(".add-project-dialog .error-message");
            if (nameResult === "valid") {
                addButton.disabled = false;
                errorMessage.textContent = "";
            } else {
                addButton.disabled = true;
                errorMessage.textContent = nameResult;
            }
        });
    };

    // Return the error string
    const _verifyProjectName = name => {
        let result = "valid";
        // Check if the name is between 1-20 characters
        if (name.length == 0 || name.length > 20) {
            result = "Project's name must have 1-20 characters.";
        } else {
            // Check if the name is already taken
            const projects = databaseController.getAllProjects();
            for (let project of projects) {
                if (project.name === name) {
                    result = "This name is already taken.";
                    break;
                }
            }
        }

        return result;
    };

    // Add project when user clicks add button
    const _setAddProjectDialogAddButton = () => {
        const addButton = document.querySelector(".add-project-dialog .add-button");
        addButton.addEventListener("click", () => {
            const name = document.querySelector(".add-project-dialog input").value;
            const timeStamp = (new Date()).getTime();
            databaseController.createProject({
                name: name,
                timeCreated: timeStamp,
            });
            _closeAddProjectDialog();
        });
    };

    // INBOX PAGE

    const _setInboxAddTaskButtonListener = () => {
        const buttons = document.querySelectorAll(".add-task-button");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                _openAddTaskCard(button);
            });
        });
    };

    const _openAddTaskCard = addButton => {
        // Hide the add-task buttons
        const addButtons = document.querySelector(".inbox-page").querySelectorAll(".add-task-button");
        addButtons.forEach(button => {
            button.classList.add("add-task-button-hidden");
        });

        // Add the add-task card
        const card = createAddTaskCard();
        _setAddTaskCardCancelButtonListener(card.querySelector(".card-cancel-button"));
        const prioritySection = addButton.parentElement;
        prioritySection.appendChild(card);
    };

    // Attach listener to cancel button in add-task card
    const _setAddTaskCardCancelButtonListener = cancelButton => {
        cancelButton.addEventListener("click", () => {
            _closeAddTaskCard();
        });
    };

    const _closeAddTaskCard = () => {
        // Remove the card
        const card = document.querySelector(".add-task-card");
        const prioritySection = card.parentElement;
        prioritySection.removeChild(prioritySection.lastChild);

        // Show the add-task buttons again
        const addButtons = document.querySelector(".inbox-page").querySelectorAll(".add-task-button");
        addButtons.forEach(button => {
            button.classList.remove("add-task-button-hidden");
        });
    };

    return {
        init,
    };
};

export default ScreenController;