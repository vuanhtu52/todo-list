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
import createDeleteProjectDialog from "../components/deleteProjectDialog/deleteProjectDialog";
import createTaskCard from "../components/taskCard/taskCard";
import createDeleteTaskDialog from "../components/deleteTaskDialog/deleteTaskDialog";
import { v4 as uuidv4 } from "uuid";
import createEditTaskDialog from "../components/editTaskDialog/editTaskDialog";
import createAddTaskDialog from "../components/addTaskDialog/addTaskDialog";
import getMonday from "../utils/getMonday";

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
        _loadProjectItems();
        _setAddProjectButtonListener();

        // Add main content
        const content = document.createElement("div");
        content.id = "content";
        content.monday = getMonday(new Date()); // Keep track of which monday to load upcoming page
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
        _setEditProjectDialogClose();
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

        // Add edit-task dialog for later use
        const editTaskDialog = createEditTaskDialog(databaseController.getAllProjects());
        body.appendChild(editTaskDialog);
        _setEditTaskDialogNameInput();
        _setEditTaskDialogClose();
        _setEditTaskDialogCancelButton();
        _setEditTaskDialogSaveButton();

        // Add delete-task dialog for later use
        const deleteTaskDialog = createDeleteTaskDialog();
        body.appendChild(deleteTaskDialog);
        _setDeleteTaskDialogClose();
        _setDeleteTaskDialogCancelButton();
        _setDeleteTaskDialogDeleteButton();
        _setDeleteTaskDialogPressEnter();

        // Add add-task dialog for later use
        const addTaskDialog = createAddTaskDialog(databaseController.getAllProjects());
        body.appendChild(addTaskDialog);
        _setAddTaskDialogClose();
        _setAddTaskDialogNameInput();
        _setAddTaskDialogCancelButton();
        _setAddTaskDialogAddButon();

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
            wrapper.appendChild(createSideBarItem(ProjectIconLink, project, true));
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
                const project = databaseController.getProjectById(button.parentElement.parentElement.id);
                _openEditProjectDialog(project);
            })
        });
    };

    // Attach listener to delete buttons on the project items on sidebar
    const _setProjectItemDeleteButtons = () => {
        const deleteButtons = document.querySelectorAll(".sidebar-item .delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const project = databaseController.getProjectById(button.parentElement.parentElement.id);
                _openDeleteProjectDialog(project);
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
            const newMonday = getMonday(new Date());
            document.querySelector("#content").monday = newMonday;
            _loadUpcomingPage(document.querySelector("#content").monday);
        } else {
            _loadProjectPage(itemId);
        }
    };

    const _loadInboxPage = () => {
        // Remove current page
        const content = document.querySelector("#content");
        if (content.lastChild) {
            content.removeChild(content.lastChild);
        }

        // Create inbox page
        const inboxPage = createInboxPage();

        // Fetch tasks from local storage
        const tasks = databaseController.getTasksByProjectId("Inbox");

        // Display tasks
        const prioritySections = inboxPage.querySelectorAll(".priority-section");
        tasks.forEach(task => {
            const priority = parseInt(task.priority);
            const wrapper = prioritySections[priority - 1].children.item(1);
            const card = createTaskCard({ task: task });
            wrapper.appendChild(card);
            _setTaskCardListeners(card);
        });

        // Add inbox page
        content.appendChild(inboxPage);

        // Set listener for add-task button
        _setAddTaskButtonListener();
    };

    const _loadTodayPage = () => {
        // Remove current page
        const content = document.querySelector("#content");
        if (content.lastChild) {
            content.removeChild(content.lastChild);
        }
        // Add today page
        content.appendChild(createTodayPage());

        // Fetch overdue tasks and display them
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        const overdueTasks = databaseController.getOverdueTasks(today);
        const overdueTasksDiv = document.querySelector(".today-page .overdue-section .tasks");
        overdueTasks.forEach(task => {
            const card = createTaskCard({ task: task, showPriority: true, showProject: true });
            overdueTasksDiv.appendChild(card);
            _setTaskCardListeners(card);
        });

        // Fetch today's tasks and display them
        const todayTasks = databaseController.getTasksByDueDate(today);
        const todayTasksDiv = document.querySelector(".today-page .today-section .tasks");
        todayTasks.forEach(task => {
            const card = createTaskCard({ task: task, showPriority: true, showProject: true });
            todayTasksDiv.appendChild(card);
            _setTaskCardListeners(card);
        });

        // Set listener for add-task button
        _setAddTaskButtonListener();
    };

    const _loadUpcomingPage = monday => {
        // Remove current page
        const content = document.querySelector("#content");
        if (content.lastChild) {
            content.removeChild(content.lastChild);
        }
        // Add upcoming page
        content.appendChild(createUpcomingPage(monday));

        // Fetch tasks of the displayed week
        const tasks = databaseController.getTasksOfTheWeek(monday);

        // Display the tasks on the calendar
        const columns = document.querySelectorAll(".upcoming-page .calendar .column");
        columns.forEach(column => {
            const selectedTasks = tasks.filter(task => task.dueDate === column.date.getTime());
            selectedTasks.forEach(task => {
                const card = createTaskCard({ task, showDueDate: false, showPriority: true, showProject: false, calendarMode: true });
                column.querySelector(".tasks").appendChild(card);
                _setTaskCardListeners(card);
            })
        });

        // Set listener for add-task button
        _setAddTaskButtonListener();
        _setBackButtonClick();
        _setForwardButtonClick();
        _setTodayButtonClick();
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
            const id = uuidv4();
            const name = document.querySelector(".add-project-dialog input").value;
            const timeStamp = (new Date()).getTime();
            databaseController.createProject({
                id: id,
                name: name,
                timeCreated: timeStamp,
            });
            _closeAddProjectDialog();
            _loadProjectItems();
            _switchPage(id);
        });
    };

    // Detect when user presses enter
    const _setAddProjectPressEnter = () => {
        const input = document.querySelector(".add-project-dialog input");
        input.addEventListener("keypress", event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                if (_verifyProjectName(input.value) === "valid") {
                    const id = uuidv4();
                    const name = input.value;
                    const timeStamp = (new Date()).getTime();
                    databaseController.createProject({
                        id: id,
                        name: name,
                        timeCreated: timeStamp,
                    });
                    _closeAddProjectDialog();
                    _loadProjectItems();
                    _switchPage(id);
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

    const _openEditProjectDialog = project => {
        const dialog = document.querySelector(".edit-project-dialog");
        dialog.dataProject = project;
        dialog.showModal();
        // Prevent scrolling
        document.body.style.overflow = "hidden";
        // Populate project name to input field
        const input = dialog.querySelector("input");
        input.value = project.name;
        // Reset error message
        const errorMessage = document.querySelector(".edit-project-dialog .error-message");
        errorMessage.textContent = "";
        // Disable save button
        const saveButton = document.querySelector(".edit-project-dialog .save-button");
        saveButton.disabled = true;
    };

    // Attach listener to edit-project dialog to detect when it closes
    const _setEditProjectDialogClose = () => {
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
            const oldProject = document.querySelector(".edit-project-dialog").dataProject;
            let newProject = {}
            newProject.id = oldProject.id;
            newProject.name = document.querySelector(".edit-project-dialog input").value;
            newProject.timeCreated = oldProject.timeCreated;
            databaseController.updateProject(oldProject, newProject)
            _closeEditProjectDialog();
            _loadProjectItems();
            _switchPage(newProject.id);
        });
    };

    // Detect when user presses enter
    const _setEditProjectPressEnter = () => {
        const input = document.querySelector(".edit-project-dialog input");
        input.addEventListener("keypress", event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                if (_verifyProjectName(input.value) === "valid") {
                    const oldProject = document.querySelector(".edit-project-dialog").dataProject;
                    let newProject = {}
                    newProject.id = oldProject.id;
                    newProject.name = document.querySelector(".edit-project-dialog input").value;
                    newProject.timeCreated = oldProject.timeCreated;
                    databaseController.updateProject(oldProject, newProject);
                    _closeEditProjectDialog();
                    _loadProjectItems();
                    _switchPage(newProject.id);
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

    const _openDeleteProjectDialog = project => {
        const dialog = document.querySelector(".delete-project-dialog");
        dialog.dataProject = project;
        dialog.showModal();
        // Prevent scrolling
        document.body.style.overflow = "hidden";
        // Populate project name to message
        const nameSpan = dialog.querySelector(".message span:first-Child");
        nameSpan.textContent = project.name;
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
            const project = document.querySelector(".delete-project-dialog").dataProject;
            databaseController.deleteProject(project.id);
            _closeDeleteProjectDialog();
            // Redirect to inbox page if the current page is the deleted project
            const activePage = document.querySelector(".sidebar-item-active");
            if (activePage.id === project.id) {
                _switchPage("Inbox");
            }
            _loadProjectItems();
        });
    };

    // Delete project when user presses enter
    const _setDeleteProjectDialogPressEnter = () => {
        const dialog = document.querySelector(".delete-project-dialog");
        dialog.addEventListener("keypress", event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                const project = document.querySelector(".delete-project-dialog").dataProject;
                databaseController.deleteProject(project.id);
                _closeDeleteProjectDialog();
                // Redirect to inbox page if the current page is the deleted project
                const activePage = document.querySelector(".sidebar-item-active");
                if (activePage.id === project.id) {
                    _switchPage("Inbox");
                }
                _loadProjectItems();
            }
        });
    };

    // INBOX PAGE

    const _setAddTaskButtonListener = () => {
        const buttons = document.querySelectorAll(".add-task-button");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                // Get the current active item's id
                const pageId = document.querySelector(".sidebar-item-active").id;
                
                if (pageId === "Upcoming") {
                    _openAddTaskDialog(button.parentElement.parentElement.date);
                } else {
                    _openAddTaskCard(button);
                }
            });
        });
    };

    const _openAddTaskCard = addButton => {
        // Get the current active item's id
        const pageId = document.querySelector(".sidebar-item-active").id;

        // Hide the add-task buttons
        let addButtons;
        if (pageId === "Inbox") {
            addButtons = document.querySelectorAll(".inbox-page .add-task-button");
        } else if (pageId === "Today") {
            addButtons = document.querySelectorAll(".today-page .add-task-button");
        }

        addButtons.forEach(button => {
            button.classList.add("add-task-button-hidden");
        });

        // Create the add-task card
        const card = createAddTaskCard(databaseController.getAllProjects());

        // Set default due date
        if (pageId === "Today") {
            _setAddTaskCardDefaultDueDate(card, new Date());
        }

        // Set default priority
        if (pageId === "Inbox") {
            _setAddTaskCardDefaultPriority(card, parseInt(addButton.parentElement.firstChild.textContent.split(" ")[1]));
        } else if (pageId === "Today") {
            _setAddTaskCardDefaultPriority(card, 4);
        }

        // Set listeners
        _setAddTaskCardCancelButtonListener(card.querySelector(".add-task-card .cancel-button"));
        _setAddTaskCardTaskNameInput(card);
        _setAddTaskCardAddButton(card);

        // Add the card
        const section = addButton.parentElement;
        section.appendChild(card);
    };

    // Set default priority for the dropdown
    const _setAddTaskCardDefaultPriority = (card, priority) => {
        const dropdown = card.querySelector(".middle-row select");
        const option = dropdown.children.item(priority - 1);
        option.selected = "selected";
    };

    // Set default due date for add-task card
    const _setAddTaskCardDefaultDueDate = (card, dueDate) => {
        const datePicker = card.querySelector(".middle-row input");
        datePicker.value = `${dueDate.getFullYear()}-${(dueDate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${dueDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;
    }

    // Attach listener to cancel button in add-task card
    const _setAddTaskCardCancelButtonListener = cancelButton => {
        cancelButton.addEventListener("click", () => {
            _closeAddTaskCard();
        });
    };

    // Attach listener for task name input field
    const _setAddTaskCardTaskNameInput = card => {
        const input = card.firstChild;
        input.addEventListener("input", () => {
            const addButton = card.querySelector(".add-button");
            if (input.textContent.trim() !== "") {
                addButton.disabled = false;
            } else {
                addButton.disabled = true;
            }
        });
    };

    // Attach listener to add button in add-task card
    const _setAddTaskCardAddButton = card => {
        const addButton = card.querySelector(".add-button");
        addButton.addEventListener("click", () => {
            // Create a new task
            const timeCreated = (new Date()).getTime();
            const name = card.firstChild.textContent.trim();
            const description = card.children.item(1).textContent.trim();
            const dueDateString = card.querySelector(".middle-row input").value;
            let dueDate = new Date();
            if (dueDateString !== "") {
                dueDate.setFullYear(dueDateString.split("-")[0]);
                dueDate.setMonth(parseInt(dueDateString.split("-")[1]) - 1);
                dueDate.setDate(dueDateString.split("-")[2]);
                dueDate.setHours(0);
                dueDate.setMinutes(0);
                dueDate.setSeconds(0);
                dueDate.setMilliseconds(0);
                dueDate = dueDate.getTime();
            } else {
                dueDate = "";
            }
            const priority = card.querySelector(".middle-row select").value.split(" ")[1];
            const projectName = card.querySelector(".bottom-row select").value;
            const task = {
                id: uuidv4(),
                name: name,
                description: description,
                dueDate: dueDate,
                priority: priority,
                projectId: databaseController.getProjectByName(projectName).id,
                timeCreated: timeCreated,
            }
            databaseController.createTask(task);

            // Reload current page
            // Get the current active item's id
            const pageId = document.querySelector(".sidebar-item-active").id;
            if (pageId === "Inbox") {
                _loadInboxPage();
            } else if (pageId === "Today") {
                _loadTodayPage();
            }
        });
    };

    const _closeAddTaskCard = () => {
        // Get the current active item's id
        const pageId = document.querySelector(".sidebar-item-active").id;

        // Remove the card
        const card = document.querySelector(".add-task-card");
        const prioritySection = card.parentElement;
        prioritySection.removeChild(prioritySection.lastChild);

        // Show the add-task buttons again
        let addButtons;
        if (pageId === "Inbox") {
            addButtons = document.querySelector(".inbox-page").querySelectorAll(".add-task-button");
        } else if (pageId === "Today") {
            addButtons = document.querySelector(".today-page").querySelectorAll(".add-task-button");
        }
        addButtons.forEach(button => {
            button.classList.remove("add-task-button-hidden");
        });
    };

    // TASK CARD

    const _setTaskCardListeners = card => {
        _setTaskCardCheckButton(card);
        _setTaskCardDeleteButton(card);
        _setTaskCardClick(card);
    };

    // Detect when user clicks the task card
    const _setTaskCardClick = card => {
        card.addEventListener("click", () => {
            _openEditTaskDialog(card.dataTask);
        });
    };

    const _setTaskCardCheckButton = card => {
        const checkButton = card.querySelector(".check-button");
        checkButton.addEventListener("click", event => {
            event.stopImmediatePropagation();
            databaseController.deleteTask(card.dataTask.id);

            // Reload the current page
            const pageId = document.querySelector(".sidebar-item-active").id;
            if (pageId === "Inbox") {
                _loadInboxPage();
            } else if (pageId === "Today") {
                _loadTodayPage();
            } else if (pageId === "Upcoming") {
                _loadUpcomingPage(document.querySelector("#content").monday);
            }
        });
    };

    const _setTaskCardDeleteButton = card => {
        const deleteButton = card.querySelector(".delete-button");
        deleteButton.addEventListener("click", event => {
            event.stopImmediatePropagation();
            const task = card.dataTask;
            _openDeleteTaskDialog(task);
        });
    };

    // EDIT TASK DIALOG
    const _openEditTaskDialog = task => {
        const dialog = document.querySelector(".edit-task-dialog");
        dialog.showModal();
        dialog.dataTask = task;
        // Prevent scrolling
        document.body.style.overflow = "hidden";

        // Populate task's name
        const nameField = dialog.querySelector("span:first-child");
        nameField.textContent = task.name;

        // Populate task's description
        const descriptionField = dialog.querySelector("span:nth-child(2)");
        descriptionField.textContent = task.description;

        // Populate task's due date
        const dueDatePicker = dialog.querySelector(".middle-row input");
        dueDatePicker.value = "";
        if (task.dueDate !== "") {
            const dueDate = new Date(parseInt(task.dueDate));
            dueDatePicker.value = `${dueDate.getFullYear()}-${(dueDate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${dueDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;
        }

        // Populate priority
        const priorityDropdown = dialog.querySelector(".middle-row select");
        priorityDropdown.children.item(task.priority - 1).selected = true;

        // Populate project
        const projectDropdown = dialog.querySelector(".bottom-row select");
        const projectName = databaseController.getProjectById(task.projectId).name;
        const option = projectDropdown.querySelector(`option[value = "${projectName}"]`);
        option.selected = true;
    };

    // Detect when the edit-task dialog closes
    const _setEditTaskDialogClose = () => {
        const dialog = document.querySelector(".edit-task-dialog");
        dialog.addEventListener("close", () => {
            // Enable scrolling again
            document.body.style.overflow = "auto";
        });
    };

    // Detect when user clicks cancel button on edit-task dialog
    const _setEditTaskDialogCancelButton = () => {
        const button = document.querySelector(".edit-task-dialog .cancel-button");
        button.addEventListener("click", event => {
            event.preventDefault();
            _closeEditTaskDialog();
        });
    };

    const _closeEditTaskDialog = () => {
        const dialog = document.querySelector(".edit-task-dialog");
        dialog.close();
    };

    // Disable the save button when name field is empty
    const _setEditTaskDialogNameInput = () => {
        const input = document.querySelector(".edit-task-dialog span:first-child");
        input.addEventListener("input", () => {
            const saveButton = document.querySelector(".edit-task-dialog .save-button");
            if (input.textContent === "") {
                saveButton.disabled = true;
            } else {
                saveButton.disabled = false;
            }
        });
    };

    // Detect when user clicks save button on edit-task dialog
    const _setEditTaskDialogSaveButton = () => {
        const saveButton = document.querySelector(".edit-task-dialog .save-button");
        saveButton.addEventListener("click", event => {
            event.preventDefault();
            // Get the old task
            const task = document.querySelector(".edit-task-dialog").dataTask;
            // Create the new task
            let newTask = {
                id: task.id,
                name: document.querySelector(".edit-task-dialog span:first-child").textContent.trim(),
                description: document.querySelector(".edit-task-dialog span:nth-child(2)").textContent.trim(),
                priority: parseInt(document.querySelector(".edit-task-dialog .middle-row select").value.split(" ")[1]),
                projectId: databaseController.getProjectByName(document.querySelector(".edit-task-dialog .bottom-row select").value).id,
            };
            const dueDateString = document.querySelector(".edit-task-dialog .middle-row input").value;
            if (dueDateString === "") {
                newTask.dueDate = "";
            } else {
                let dueDate = new Date();
                dueDate.setFullYear(dueDateString.split("-")[0]);
                dueDate.setMonth(parseInt(dueDateString.split("-")[1]) - 1);
                dueDate.setDate(dueDateString.split("-")[2]);
                dueDate.setHours(0);
                dueDate.setMinutes(0);
                dueDate.setSeconds(0);
                dueDate.setMilliseconds(0);
                newTask.dueDate = dueDate.getTime();
            }
            // Update the old task to new task
            databaseController.updateTask(task, newTask);
            _closeEditTaskDialog();

            // Reload current page
            const pageId = document.querySelector(".sidebar-item-active").id;
            if (pageId === "Inbox") {
                _loadInboxPage();
            } else if (pageId === "Today") {
                _loadTodayPage();
            } else if (pageId === "Upcoming") {
                _loadUpcomingPage(document.querySelector("#content").monday);
            }
        });
    };

    // DELETE TASK DIALOG

    const _openDeleteTaskDialog = task => {
        const dialog = document.querySelector(".delete-task-dialog");
        dialog.dataTask = task;
        dialog.showModal();
        // Prevent scrolling
        document.body.style.overflow = "hidden";
        // Populate task name to message
        const nameSpan = dialog.querySelector(".message span:first-Child");
        nameSpan.textContent = task.name;
    };

    // Detect when the delete-task dialog closes
    const _setDeleteTaskDialogClose = () => {
        const dialog = document.querySelector(".delete-task-dialog");
        dialog.addEventListener("close", () => {
            // Enable scrolling again
            document.body.style.overflow = "auto";
        });
    };

    const _setDeleteTaskDialogCancelButton = () => {
        const button = document.querySelector(".delete-task-dialog .cancel-button");
        button.addEventListener("click", event => {
            event.preventDefault();
            _closeDeleteTaskDialog();
        });
    };

    const _closeDeleteTaskDialog = () => {
        const dialog = document.querySelector(".delete-task-dialog");
        dialog.close();
    };

    // Delete task when user clicks delete button
    const _setDeleteTaskDialogDeleteButton = () => {
        const deleteButton = document.querySelector(".delete-task-dialog .delete-button");
        deleteButton.addEventListener("click", event => {
            event.preventDefault();
            const task = document.querySelector(".delete-task-dialog").dataTask;
            databaseController.deleteTask(task.id);
            _closeDeleteTaskDialog();

            // Reload current page
            const pageId = document.querySelector(".sidebar-item-active").id;
            if (pageId === "Inbox") {
                _loadInboxPage();
            } else if (pageId === "Today") {
                _loadTodayPage();
            } else if (pageId === "Upcoming") {
                _loadUpcomingPage(document.querySelector("#content").monday);
            }
        });
    };

    // Delete task when user presses enter
    const _setDeleteTaskDialogPressEnter = () => {
        const dialog = document.querySelector(".delete-task-dialog");
        dialog.addEventListener("keypress", event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                const task = document.querySelector(".delete-task-dialog").dataTask;
                databaseController.deleteTask(task.id);
                _closeDeleteTaskDialog();

                // Reload current page
                const pageId = document.querySelector(".sidebar-item-active").id;
                if (pageId === "Inbox") {
                    _loadInboxPage();
                } else if (pageId === "Today") {
                    _loadTodayPage();
                } else if (pageId === "Upcoming") {
                    _loadUpcomingPage(document.querySelector("#content").monday);
                }
            }
        });
    };

    // ADD TASK DIALOG

    const _openAddTaskDialog = date => {
        const dialog = document.querySelector(".add-task-dialog");
        dialog.showModal();
        // Prevent scrolling
        document.body.style.overflow = "hidden";

        // Reset values
        const nameField = document.querySelector(".add-task-dialog span:first-child");
        nameField.textContent = "";
        const descriptionField = document.querySelector(".add-task-dialog span:nth-child(2)");
        descriptionField.textContent = "";
        const addButton = document.querySelector(".add-task-dialog .add-button");
        addButton.disabled = true;

        // Set default due date based on the column user clicked on
        const datePicker = document.querySelector(".add-task-dialog .middle-row input");
        datePicker.value = `${date.getFullYear()}-${(date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;

        // Set default priority 
        const option = document.querySelector(".add-task-dialog .middle-row select").children.item(3);
        option.selected = true;
    };

    const _closeAddTaskDialog = () => {
        const dialog = document.querySelector(".add-task-dialog");
        dialog.close();
    }

    // Detect when add-task dialog closes
    const _setAddTaskDialogClose = () => {
        const dialog = document.querySelector(".add-task-dialog");
        dialog.addEventListener("close", () => {
            // Enable scrolling again
            document.body.style.overflow = "auto";
        });
    };

    // Detect when user is typing the task's name
    const _setAddTaskDialogNameInput = () => {
        const input = document.querySelector(".add-task-dialog span:first-child");
        input.addEventListener("input", () => {
            const addButton = document.querySelector(".add-task-dialog .add-button");
            if (input.textContent.trim() !== "") {
                addButton.disabled = false;
            } else {
                addButton.disabled = true;
            }
        });
    };

    // Detect when user presses cancel on add-task dialog
    const _setAddTaskDialogCancelButton = () => {
        const cancelButton = document.querySelector(".add-task-dialog .cancel-button");
        cancelButton.addEventListener("click", event => {
            event.preventDefault();
            _closeAddTaskDialog();
        });
    };

    // Detect when user clicks add button on add-task dialog
    const _setAddTaskDialogAddButon = () => {
        const addButton = document.querySelector(".add-task-dialog .add-button");
        addButton.addEventListener("click", event => {
            event.preventDefault();
            // Create new task
            const timeCreated = (new Date()).getTime();
            const name = document.querySelector(".add-task-dialog span:first-child").textContent.trim();
            const description = document.querySelector(".add-task-dialog span:nth-child(2)").textContent.trim();
            const dueDateString = document.querySelector(".add-task-dialog .middle-row input").value;
            let dueDate = new Date();
            if (dueDateString !== "") {
                dueDate.setFullYear(dueDateString.split("-")[0]);
                dueDate.setMonth(parseInt(dueDateString.split("-")[1]) - 1);
                dueDate.setDate(dueDateString.split("-")[2]);
                dueDate.setHours(0);
                dueDate.setMinutes(0);
                dueDate.setSeconds(0);
                dueDate.setMilliseconds(0);
                dueDate = dueDate.getTime();
            } else {
                dueDate = "";
            }
            const priority = document.querySelector(".add-task-dialog .middle-row select").value.split(" ")[1];
            const projectName = document.querySelector(".add-task-dialog .bottom-row select").value;
            const task = {
                id: uuidv4(),
                name: name,
                description: description,
                dueDate: dueDate,
                priority: priority,
                projectId: databaseController.getProjectByName(projectName).id,
                timeCreated: timeCreated,
            }
            databaseController.createTask(task);

            // Reload current page
            _closeAddTaskDialog();
            _loadUpcomingPage(document.querySelector("#content").monday);
        });
    };

    // UPCOMING PAGE

    // Detect when user clicks the back button at the top
    const _setBackButtonClick = () => {
        const backButton = document.querySelector(".upcoming-page .back-button");
        backButton.addEventListener("click", () => {
            // Set the new monday and reload upcoming page
            let newMonday = new Date(document.querySelector("#content").monday)
            newMonday.setDate(newMonday.getDate() - 7);
            document.querySelector("#content").monday = newMonday;
            _loadUpcomingPage(document.querySelector("#content").monday);
        });
    };

    // Detech when user clicks the forward button at the top
    const _setForwardButtonClick = () => {
        const forwardButon = document.querySelector(".upcoming-page .forward-button");
        forwardButon.addEventListener("click", () => {
            // Set the new monday and reload upcoming page
            let newMonday = new Date(document.querySelector("#content").monday)
            newMonday.setDate(newMonday.getDate() + 7);
            document.querySelector("#content").monday = newMonday;
            _loadUpcomingPage(document.querySelector("#content").monday);
        });
    };

    // Detect when user clicks today button at the top
    const _setTodayButtonClick = () => {
        const todayButton = document.querySelector(".upcoming-page .today-button");
        todayButton.addEventListener("click", () => {
            // Set the new monday and reload upcoming page
            const newMonday = getMonday(new Date());
            document.querySelector("#content").monday = newMonday;
            _loadUpcomingPage(document.querySelector("#content").monday);
        });
    };

    return {
        init,
    };
};

export default ScreenController;