import createNavBar from "../components/navBar/navBar";
import createSideBar from "../components/sideBar/sideBar";
import createInboxPage from "../components/inboxPage/inboxPage";
import createTodayPage from "../components/todayPage/todayPage";
import createUpcomingPage from "../components/upcomingPage/upcomingPage";
import createAddTaskCard from "../components/addTaskCard/addTaskCard";
import createAddProjectDialog from "../components/addProjectDialog/addProjectDialog";
import DatabaseController from "./DatabaseController";
import createSideBarItem from "../components/sideBarItem/sideBarItem";
import ProjectIconLink from "../../assets/circle.svg";
import createProjectPage from "../components/projectPage/projectPage";
import createEditProjectDialog from "../components/editProjectDialog/editProjectDialog";
import { de } from "date-fns/locale";
import createDeleteProjectDialog from "../components/deleteProjectDialog/deleteProjectDialog";

const ScreenController = () => {
    const databaseController = DatabaseController();
    let oldProjectName = "";

    const init = () => {
        const body = document.querySelector("body");

        // Add navbar
        const navBar = createNavBar();
        body.appendChild(navBar);
        _setNavBarLogoListener();

        // Add sidebar
        const sideBar = createSideBar();
        body.appendChild(sideBar);
        _loadProjectItems();
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
        _setAddProjectPressEnter();
        _setAddProjectDialogCancelButton();
        _setAddProjectDialogAddButton();

        // Add edit-project dialog for later use
        const editProjectDialog = createEditProjectDialog();
        body.appendChild(editProjectDialog);
        _setEditProjectDialogListener();
        _setEditProjectDialogInput();
        _setEditProjectPressEnter();
        _setEditProjectDialogCancelButton();
        _setEditProjectDialogSaveButton();

        // Add delete-project dialog for later use
        const deleteProjectDialog = createDeleteProjectDialog();
        body.appendChild(deleteProjectDialog);
        _setDeleteProjectDialogListener();
        _setDeleteProjectDialogCancelButton();
        _setDeleteProjectDialogDeleteButton();
        _setDeleteProjectDialogPressEnter();

        // Load the inbox page by default
        _switchPage("Inbox");
    };

    // NAVBAR

    // Direct to inbox page when user clicks on the logo
    const _setNavBarLogoListener = () => {
        const logo = document.querySelector(".logo");
        logo.addEventListener("click", () => {
            const inboxItem = document.querySelector("#Inbox");
            if (!inboxItem.classList.contains("sidebar-item-active")) {
                _switchPage(inboxItem.id);
            }
        });
    };

    // SIDEBAR

    // Load the project items on the sidebar
    const _loadProjectItems = () => {
        // Get all projects except Inbox
        let projects = databaseController.getAllProjects();
        projects = projects.filter(project => project.name !== "Inbox");

        // Remove all items
        const wrapper = document.querySelector(".side-bar .project-items");
        while (wrapper.lastChild) {
            wrapper.removeChild(wrapper.lastChild);
        }

        // Attach the project items to sidebar
        projects.forEach(project => {
            wrapper.appendChild(createSideBarItem(ProjectIconLink, project.name, true));
        });

        // Attach listener for sidebar project items again
        _setItemListener();
        _setProjectItemEditButtons();
        _setProjectItemDeleteButtons();
    };

    // Attach listener to edit buttons on the project items on sidebar
    const _setProjectItemEditButtons = () => {
        const editButtons = document.querySelectorAll(".sidebar-item .edit-button");
        editButtons.forEach(button => {
            button.addEventListener("click", () => {
                _openEditProjectDialog(button.parentElement.parentElement.id);
            })
        });
    };

    // Attach listener to delete buttons on the project items on sidebar
    const _setProjectItemDeleteButtons = () => {
        const deleteButtons = document.querySelectorAll(".sidebar-item .delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                _openDeleteProjectDialog(button.parentElement.parentElement.id);
            });
        });
    };

    // Direct to the corresponding page when user clicks an item on the sidebar
    const _setItemListener = () => {
        const sideBarItems = document.querySelectorAll(".sidebar-item");
        sideBarItems.forEach(item => {
            const content = item.querySelector(".item-content");
            content.addEventListener("click", () => {
                if (!item.classList.contains("sidebar-item-active")) {
                    _switchPage(item.id);
                }
            });
        });
    };

    // Change background of the active item
    const _setItemActive = itemId => {
        // Remove active states from all items first
        let items = document.querySelectorAll(".sidebar-item");
        items.forEach(i => {
            i.className = "sidebar-item";
        });
        // Append active class to selected item
        let item = document.getElementById(itemId);
        item.classList.add("sidebar-item-active");
    };

    const _switchPage = itemId => {
        _setItemActive(itemId);

        if (itemId === "Inbox") {
            _loadInboxPage();
        } else if (itemId === "Today") {
            _loadTodayPage();
        } else if (itemId === "Upcoming") {
            _loadUpcomingPage();
        } else {
            _loadProjectPage(itemId);
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

    const _loadProjectPage = projectId => {
        const content = document.querySelector("#content");
        if (content.lastChild) {
            content.removeChild(content.lastChild);
        }
        content.appendChild(createProjectPage(projectId));
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
        dialog.showModal();
        // Prevent scrolling
        document.body.style.overflow = "hidden";

        // Reset input's content and any error message
        const input = document.querySelector(".add-project-dialog input");
        input.value = "";
        const errorMessage = document.querySelector(".add-project-dialog .error-message");
        errorMessage.textContent = "";

        // Disable add button
        const addButton = document.querySelector(".add-project-dialog .add-button");
        addButton.disabled = true;
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
        button.addEventListener("click", event => {
            event.preventDefault();
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

    // Detect when user clicks add button
    const _setAddProjectDialogAddButton = () => {
        const addButton = document.querySelector(".add-project-dialog .add-button");
        addButton.addEventListener("click", event => {
            event.preventDefault();
            const name = document.querySelector(".add-project-dialog input").value;
            const timeStamp = (new Date()).getTime();
            databaseController.createProject({
                name: name,
                timeCreated: timeStamp,
            });
            _closeAddProjectDialog();
            _loadProjectItems();
            _switchPage(name);
        });
    };

    // Detect when user presses enter
    const _setAddProjectPressEnter = () => {
        const input = document.querySelector(".add-project-dialog input");
        input.addEventListener("keypress", event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                if (_verifyProjectName(input.value) === "valid") {
                    const name = input.value;
                    const timeStamp = (new Date()).getTime();
                    databaseController.createProject({
                        name: name,
                        timeCreated: timeStamp,
                    });
                    _closeAddProjectDialog();
                    _loadProjectItems();
                    _switchPage(name);
                } else {
                    const errorMessage = document.querySelector(".add-project-dialog .error-message");
                    if (errorMessage.textContent === "") {
                        errorMessage.textContent = _verifyProjectName(input.value);
                    }
                }
            }
        });
    }

    // EDIT PROJECT DIALOG

    const _openEditProjectDialog = projectName => {
        const dialog = document.querySelector(".edit-project-dialog");
        dialog.showModal();
        // Prevent scrolling
        document.body.style.overflow = "hidden";
        // Populate project name to input field
        const input = dialog.querySelector("input");
        input.value = projectName;
        // Reset error message
        const errorMessage = document.querySelector(".edit-project-dialog .error-message");
        errorMessage.textContent = "";
        // Disable save button
        const saveButton = document.querySelector(".edit-project-dialog .save-button");
        saveButton.disabled = true;
        // Save the old project's name for later use
        oldProjectName = projectName;
    };

    // Attach listener to edit-project dialog to detect when it closes
    const _setEditProjectDialogListener = () => {
        const dialog = document.querySelector(".edit-project-dialog");
        dialog.addEventListener("close", () => {
            // Enable scrolling again
            document.body.style.overflow = "auto";
        });
    };

    // Detect when user clicks cancel button
    const _setEditProjectDialogCancelButton = () => {
        const button = document.querySelector(".edit-project-dialog .cancel-button");
        button.addEventListener("click", event => {
            event.preventDefault();
            _closeEditProjectDialog();
        });
    };

    const _closeEditProjectDialog = () => {
        const dialog = document.querySelector(".edit-project-dialog");
        dialog.close();
    }

    // Detect when user is typing new name to input field and verify
    const _setEditProjectDialogInput = () => {
        const input = document.querySelector(".edit-project-dialog input");
        input.addEventListener("input", () => {
            const nameResult = _verifyProjectName(input.value);
            const saveButton = document.querySelector(".edit-project-dialog .save-button");
            const errorMessage = document.querySelector(".edit-project-dialog .error-message");
            if (nameResult === "valid") {
                saveButton.disabled = false;
                errorMessage.textContent = "";
            } else {
                saveButton.disabled = true;
                errorMessage.textContent = nameResult;
            }
        });
    };

    // Detect when user clicks save
    const _setEditProjectDialogSaveButton = () => {
        const saveButton = document.querySelector(".edit-project-dialog .save-button");
        saveButton.addEventListener("click", event => {
            event.preventDefault();
            const oldProject = databaseController.getProject(oldProjectName);
            oldProjectName = "";
            let newProject = {}
            newProject.name = document.querySelector(".edit-project-dialog input").value;
            newProject.timeCreated = oldProject.timeCreated;
            databaseController.updateProject(oldProject, newProject)
            _closeEditProjectDialog();
            _loadProjectItems();
            _switchPage(newProject.name);
        });
    };

    // Detect when user presses enter
    const _setEditProjectPressEnter = () => {
        const input = document.querySelector(".edit-project-dialog input");
        input.addEventListener("keypress", event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                if (_verifyProjectName(input.value) === "valid") {
                    const oldProject = databaseController.getProject(oldProjectName);
                    oldProjectName = "";
                    let newProject = {}
                    newProject.name = document.querySelector(".edit-project-dialog input").value;
                    newProject.timeCreated = oldProject.timeCreated;
                    databaseController.updateProject(oldProject, newProject)
                    _closeEditProjectDialog();
                    _loadProjectItems();
                    _switchPage(newProject.name);
                } else {
                    const errorMessage = document.querySelector(".edit-project-dialog .error-message");
                    if (errorMessage.textContent === "") {
                        errorMessage.textContent = _verifyProjectName(input.value);
                    }
                }
            }
        });
    };

    // DELETE PROJECT DIALOG

    const _openDeleteProjectDialog = projectName => {
        const dialog = document.querySelector(".delete-project-dialog");
        dialog.showModal();
        // Prevent scrolling
        document.body.style.overflow = "hidden";
        // Populate project name to messagee
        const nameSpan = dialog.querySelector(".message span:first-Child");
        nameSpan.textContent = projectName;
        // Save the old project's name for later use
        oldProjectName = projectName;
    };

    // Attach listener to delete-project dialog to detect when it closes
    const _setDeleteProjectDialogListener = () => {
        const dialog = document.querySelector(".delete-project-dialog");
        dialog.addEventListener("close", () => {
            // Enable scrolling again
            document.body.style.overflow = "auto";
        });
    };

    // Detect when user clicks cancel button
    const _setDeleteProjectDialogCancelButton = () => {
        const button = document.querySelector(".delete-project-dialog .cancel-button");
        button.addEventListener("click", event => {
            event.preventDefault();
            _closeDeleteProjectDialog();
        });
    };

    const _closeDeleteProjectDialog = () => {
        const dialog = document.querySelector(".delete-project-dialog");
        dialog.close();
    };

    // Delete project when user clicks delete button
    const _setDeleteProjectDialogDeleteButton = () => {
        const deleteButton = document.querySelector(".delete-project-dialog .delete-button");
        deleteButton.addEventListener("click", event => {
            event.preventDefault();
            databaseController.deleteProject(oldProjectName);
            _closeDeleteProjectDialog();
            _loadProjectItems();
            _switchPage("Inbox");
        });
    };

    // Delete project when user presses enter
    const _setDeleteProjectDialogPressEnter = () => {
        const dialog = document.querySelector(".delete-project-dialog");
        dialog.addEventListener("keypress", event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                databaseController.deleteProject(oldProjectName);
                _closeDeleteProjectDialog();
                _loadProjectItems();
                _switchPage("Inbox");
            }
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