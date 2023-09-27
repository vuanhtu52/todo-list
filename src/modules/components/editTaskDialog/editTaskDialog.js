import "./editTaskDialog.css";

const createEditTaskDialog = () => {
    const dialog = document.createElement("dialog");
    dialog.textContent = "edit task";

    return dialog;
};

export default createEditTaskDialog;