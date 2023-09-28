import createAddTaskButton from "../addTaskButton/addTaskButton";
import "./todayPage.css";

const createTodayPage = () => {
    // Create page
    const todayPage = document.createElement("div");
    todayPage.className = "today-page";

    // Create the wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    // Add header
    const header = document.createElement("div");
    header.className = "header";
    const title = document.createElement("div");
    title.textContent = "Today";
    header.appendChild(title);
    const date = document.createElement("div");
    const today = new Date();
    date.textContent = `${today.toLocaleString("en-us", {weekday: "long"})} ${today.toLocaleString("default", {month: "long"})} ${today.getDate()}, ${today.getFullYear()}`;
    header.appendChild(date);
    wrapper.appendChild(header); 

    // Add content section
    const content = document.createElement("div");
    const tasks = document.createElement("div");
    tasks.className = "tasks";
    content.appendChild(tasks);
    const addTaskButton = createAddTaskButton();
    content.appendChild(addTaskButton);
    wrapper.appendChild(content);

    todayPage.appendChild(wrapper);

    return todayPage;
};

export default createTodayPage;