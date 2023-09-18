import "./inboxPage.css";

const createInboxPage = () => {
    // Create the inbox page
    const inboxPage = document.createElement("div");
    inboxPage.className = "inbox-page";

    // Add the content wrapper outside
    const inboxContent = document.createElement("div");
    inboxContent.className = "inbox-content";

    // Add header
    const header = document.createElement("div");
    header.className = "inbox-header";
    header.textContent = "Inbox";
    inboxContent.appendChild(header);

    // Add priority sections
    for (let i = 1; i < 5; i++) {
        const section = createPrioritySection(i);
        section.className = "priority-section";
        inboxContent.appendChild(section);
    }

    inboxPage.appendChild(inboxContent);

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
    const addSymbol = document.createElement("span");
    addSymbol.textContent = "+";
    const addText = document.createElement("span");
    addText.textContent = "Add task";
    // addTaskButton.textContent = "+ Add task";
    addTaskButton.appendChild(addSymbol);
    addTaskButton.appendChild(addText);
    section.appendChild(addTaskButton);

    return section;
}

export default createInboxPage;