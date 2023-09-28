import "./taskCard.css";
import CalendarIconPath from "../../../assets/calendar.svg";
import DeleteIconPath from "../../../assets/delete.svg";

const createTaskCard = ({task, showPriority = false}) => {
    const card = document.createElement("div");
    card.className = "task-card";
    card.dataTask = task;

    const leftColumn = document.createElement("div");

    // Create check button on the left
    const checkButton = document.createElement("button");
    checkButton.className = "check-button";
    leftColumn.appendChild(checkButton);

    card.appendChild(leftColumn);

    const middleColumn = document.createElement("div");
    middleColumn.className = "middle-column";

    // Add task name
    const nameDiv = document.createElement("div");
    nameDiv.textContent = task.name;
    middleColumn.appendChild(nameDiv);

    // Add task description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.textContent = task.description;
    middleColumn.appendChild(descriptionDiv);

    const bottomRow = document.createElement("div");
    bottomRow.className = "bottom-row";

    // Add due date
    const dueDateDiv = document.createElement("div");
    dueDateDiv.className = "due-date";
    const icon = new Image();
    icon.src = CalendarIconPath;
    dueDateDiv.appendChild(icon);
    const text = document.createElement("div");
    let dateString;
    if (task.dueDate === "") {
        dateString = "No due date";
    } else {
        let dueDate = new Date(parseInt(task.dueDate));
        dateString = `${dueDate.getFullYear()}-${(dueDate.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}-${dueDate.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;
    }
    text.textContent = dateString;
    dueDateDiv.appendChild(text);
    bottomRow.appendChild(dueDateDiv);

    // Add priority
    if (showPriority) {
        console.log("show priority");
        const priority = document.createElement("div");
        priority.className = "priority";
        priority.textContent = `Priority ${task.priority.toString()}`;
        bottomRow.appendChild(priority);
    }

    middleColumn.appendChild(bottomRow);
    card.appendChild(middleColumn)

    const rightColumn = document.createElement("div");

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    const deleteIcon = new Image();
    deleteIcon.src = DeleteIconPath;
    deleteButton.appendChild(deleteIcon);
    rightColumn.appendChild(deleteButton);

    card.appendChild(rightColumn);

    return card;
};

export default createTaskCard;