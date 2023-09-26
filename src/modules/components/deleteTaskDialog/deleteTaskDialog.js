import "./deleteTaskDialog.css";

const createDeleteTaskDialog = () => {
    // Add the dialog
    const dialog = document.createElement("dialog");
    dialog.className = "delete-task-dialog";

    // Add the wrapper for content
    const wrapper = document.createElement("div");

    // Add the header
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = "Delete task?";
    wrapper.appendChild(header);

    // Add the message
    const message = document.createElement("div");
    message.className = "message";
    message.textContent = "Are you sure you want to delete ";
    const span = document.createElement("span");
    message.appendChild(span);
    const span2 = document.createElement("span");
    span2.textContent = "?";
    message.appendChild(span2);
    wrapper.appendChild(message);

    // Add the buttons
    const bottomRow = document.createElement("div");
    bottomRow.className = "bottom-row";
    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button";
    cancelButton.textContent = "Cancel";
    bottomRow.appendChild(cancelButton);
    const deleteButton = document.createElement("button")
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    bottomRow.appendChild(deleteButton);
    wrapper.appendChild(bottomRow);

    dialog.appendChild(wrapper);

    return dialog;
};

export default createDeleteTaskDialog;