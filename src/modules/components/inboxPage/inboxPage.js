import "./inboxPage.css";

const createInboxPage = () => {
    // Create the inbox page
    const inboxPage = document.createElement("div");
    inboxPage.className = "inbox-page";

    // Add header
    const header = document.createElement("div");
    header.className = "inbox-header";
    header.textContent = "Inbox";
    inboxPage.appendChild(header);

    // Add priority sections
    for (let i = 1; i < 5; i++) {
        const section = createPrioritySection(i);
        inboxPage.appendChild(section);
    }

    return inboxPage;
};

const createPrioritySection = priorityNumber => {
    // Create section
    const section = document.createElement("div");
    section.className = "priority-section";

    // Add header
    const header = document.createElement("div");
    header.className = "priority-header";
    header.textContent = `Priority ${priorityNumber.toString()}`;
    section.appendChild(header);

    // Add tasks list
    const tasks = document.createElement("div");
    tasks.textContent = "tasks here";
    section.appendChild(tasks);

    // Add add-task button
    const addTaskButton = document.createElement("button");
    addTaskButton.className = "add-task-button";
    addTaskButton.textContent = "+ Add task";
    section.appendChild(addTaskButton);

    return section;
}

export default createInboxPage;