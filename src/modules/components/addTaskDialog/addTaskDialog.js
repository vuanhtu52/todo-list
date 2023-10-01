import createAddTaskCard from "../addTaskCard/addTaskCard";
import "./addTaskDialog.css";

const createAddTaskDialog = projects => {
    const dialog = document.createElement("dialog");
    dialog.className = "add-task-dialog";

    const card = createAddTaskCard(projects);
    dialog.appendChild(card);

    return dialog;
};

export default createAddTaskDialog;