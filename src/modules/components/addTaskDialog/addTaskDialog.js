import "./addTaskDialog.css";

const createAddTaskDialog = () => {
    const dialog = document.createElement("dialog");
    
    const div = document.createElement("div");
    div.textContent = "dialog";
    dialog.appendChild(div);

    return dialog;
};

export default createAddTaskDialog;