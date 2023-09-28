import "./addTaskButton.css";

const createAddTaskButton = () => {
    const addTaskButton = document.createElement("button");
    addTaskButton.className = "add-task-button";

    const addSymbol = document.createElement("span");
    addSymbol.textContent = "+";
    addTaskButton.appendChild(addSymbol);

    const addText = document.createElement("span");
    addText.textContent = "Add task";
    addTaskButton.appendChild(addText);

    return addTaskButton;
};

export default createAddTaskButton;