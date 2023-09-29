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

    // Add overdue section
    const overdueSection = document.createElement("div");
    overdueSection.className = "overdue-section";
    
    const overdueHeader = document.createElement("div");
    overdueHeader.className = "header";
    overdueHeader.textContent = "Overdue";
    overdueSection.appendChild(overdueHeader);

    const overdueTasks = document.createElement("div");
    overdueTasks.className = "tasks";
    overdueSection.appendChild(overdueTasks);

    wrapper.appendChild(overdueSection);

    // Add today's task section
    const todaySection = document.createElement("div");
    todaySection.className = "today-section";
    
    const todayHeader = document.createElement("div");
    todayHeader.className = "header";
    todayHeader.textContent = `${today.getDate()} ${today.toLocaleString("default", {month: "long"}).substring(0, 3)} ‧ Today ‧ ${today.toLocaleString("en-us", {weekday: "long"})}`;
    todaySection.appendChild(todayHeader);

    const todayTasks = document.createElement("div");
    todayTasks.className = "tasks";
    todaySection.appendChild(todayTasks);

    const addButton = createAddTaskButton();
    todaySection.appendChild(addButton);

    wrapper.appendChild(todaySection);

    todayPage.appendChild(wrapper);

    return todayPage;
};

export default createTodayPage;