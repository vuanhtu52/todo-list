import createAddTaskButton from "../addTaskButton/addTaskButton";
import "./upcomingPage.css";

const createUpcomingPage = () => {
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
    const today = new Date();
    dateDiv.textContent = `${today.toLocaleString("default", {month: "long"})} ${today.getFullYear()}`;
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
    
    // // Add calendar's header
    // const calenderHeader = document.createElement("div");
    // calenderHeader.className = "header";
    // let currentDate = getMonday(new Date());
    // for (let i = 0; i < 7; i++) {
    //     const title = document.createElement("div");

    //     // Add day of the week
    //     const weekday = document.createElement("div");
    //     weekday.textContent = currentDate.toLocaleString("en-us", {weekday: "long"});
    //     title.appendChild(weekday);

    //     // Add day of the month
    //     const monthday = document.createElement("div");
    //     monthday.textContent = currentDate.getDate();
    //     title.appendChild(monthday);

    //     // Change color if current date is today
    //     const today = new Date();
    //     if (today.getDate() === currentDate.getDate()) {
    //         title.style.color = "#A16207";
    //     } else {
    //         weekday.color = "grey";
    //         monthday.color = "black";
    //     }

    //     calenderHeader.appendChild(title);
    //     currentDate.setDate(currentDate.getDate() + 1);
    // }
    // calender.appendChild(calenderHeader);

    // // Add calendar's content
    // const calendarContent = document.createElement("div");
    // calendarContent.className = "content";
    // currentDate = getMonday(new Date());
    // for (let i = 0; i < 7; i++) {
    //     const column = document.createElement("div");
    //     column.textContent = "cards here";
    //     calendarContent.appendChild(column);
    // }
    // calender.appendChild(calendarContent);

    let currentDate = getMonday(new Date());
    for (let i = 0; i < 7; i++) {
        const column = document.createElement("div");
        column.className = "column";

        // Add header
        const header = document.createElement("div");
        header.className = "header";

        const weekday = document.createElement("div");
        weekday.textContent = currentDate.toLocaleString("en-us", {weekday: "long"});
        header.appendChild(weekday);

        const monthday = document.createElement("div");
        monthday.textContent = currentDate.getDate();
        header.appendChild(monthday);

        // Change header's color if current date is today
        const today = new Date();
        if (today.getDate() === currentDate.getDate()) {
            header.style.color = "#A16207";
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

    console.log(getMonday(new Date()));

    return upcomingPage;
};

// Get monday of the week
const getMonday = date => {
    const monday = new Date(date);
    if (date.getDate() !== 0) {
        monday.setDate(date.getDate() - (date.getDay() - 1));
    } else { // Adjust formula for Sunday
        monday.setDate(date.getDate() - 6);
    }

    return monday;
};

export default createUpcomingPage;