import createAddTaskButton from "../addTaskButton/addTaskButton";
import "./upcomingPage.css";
import getMonday from "../../utils/getMonday";

const createUpcomingPage = monday => {
    const upcomingPage = document.createElement("div");
    upcomingPage.className = "upcoming-page";

    // Create the wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    // Add header
    const header = document.createElement("div")
    header.className = "header";

    const dateDiv = document.createElement("div");
    dateDiv.className = "date";
    dateDiv.textContent = `${monday.toLocaleString("default", { month: "long" })} ${monday.getFullYear()}`;
    header.appendChild(dateDiv);

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    const arrowButtons = document.createElement("div");
    arrowButtons.className = "arrow-buttons";

    const backButton = document.createElement("button");
    backButton.className = "back-button";
    backButton.textContent = "<";
    arrowButtons.appendChild(backButton);

    const forwardButton = document.createElement("button");
    forwardButton.className = "forward-button";
    forwardButton.textContent = ">";
    arrowButtons.appendChild(forwardButton);

    buttons.appendChild(arrowButtons);

    const todayButton = document.createElement("button");
    todayButton.className = "today-button";
    todayButton.textContent = "Today";
    buttons.appendChild(todayButton);

    header.appendChild(buttons);
    wrapper.appendChild(header);

    // Add calendar
    const calendar = document.createElement("div");
    calendar.className = "calendar";

    let currentDate = new Date(monday);
    for (let i = 0; i < 7; i++) {
        const column = document.createElement("div");
        column.className = "column"; 
        column.date = new Date(currentDate);

        // Add header
        const header = document.createElement("div");
        header.className = "header";

        const weekday = document.createElement("div");
        weekday.textContent = currentDate.toLocaleString("en-us", { weekday: "long" });
        header.appendChild(weekday);

        const monthday = document.createElement("div");
        monthday.textContent = currentDate.getDate();
        header.appendChild(monthday);

        // Change column header's color and header's content if current date is today
        const today = new Date();
        if (today.getDate() === currentDate.getDate() && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear()) {
            header.style.color = "#A16207";
            wrapper.querySelector(".header .date").textContent = `${today.toLocaleString("default", { month: "long" })} ${today.getFullYear()}`;
        } else {
            weekday.style.color = "grey";
            monthday.style.color = "black";
        }

        column.appendChild(header);

        // Add content
        const content = document.createElement("div");

        const tasks = document.createElement("div");
        tasks.className = "tasks";
        content.appendChild(tasks);

        const addTaskButton = createAddTaskButton();
        content.appendChild(addTaskButton);

        column.appendChild(content);

        calendar.appendChild(column);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    wrapper.appendChild(calendar);
    upcomingPage.appendChild(wrapper);

    return upcomingPage;
};

export default createUpcomingPage;