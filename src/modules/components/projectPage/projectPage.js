import createAddTaskButton from "../addTaskButton/addTaskButton";
import "./projectPage.css";

const createProjectPage = project => {
    // Add page
    const page = document.createElement("div");
    page.className = "project-page";
    page.id = `${project.id}-page`;

    // Add wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    // Add header
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = project.name;
    wrapper.appendChild(header);

    // Add content section
    const content = document.createElement("div");
    content.className = "content";

    // Add section for tasks display
    const tasks = document.createElement("div");
    tasks.className = "tasks";
    content.appendChild(tasks);

    // Add add-task button
    const addButton = createAddTaskButton();
    content.appendChild(addButton);

    wrapper.appendChild(content);
    page.appendChild(wrapper);

    return page;
};

export default createProjectPage;