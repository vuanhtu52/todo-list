import "./editProjectDialog.css";

const createEditProjectDialog = () => {
    // Add the dialog
    const dialog = document.createElement("dialog");
    dialog.className = "edit-project-dialog";

    // Add the wrapper for content
    const wrapper = document.createElement("div");

    // Add the header
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = "Edit project";
    wrapper.appendChild(header);

    // Add the input for project name
    const form = document.createElement("div");
    form.className = "form";
    const label = document.createElement("label");
    label.textContent = "Name";
    form.appendChild(label);
    const input = document.createElement("input");
    form.appendChild(input);
    const errorMessage = document.createElement("span");
    errorMessage.className = "error-message";
    errorMessage.ariaLive = "polite";
    form.appendChild(errorMessage)
    wrapper.appendChild(form);

    // Add the buttons
    const bottomRow = document.createElement("div");
    bottomRow.className = "bottom-row";
    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button";
    cancelButton.textContent = "Cancel";
    bottomRow.appendChild(cancelButton);
    const addButton = document.createElement("button")
    addButton.className = "save-button";
    addButton.textContent = "Save";
    addButton.disabled = true;
    bottomRow.appendChild(addButton);
    wrapper.appendChild(bottomRow);

    dialog.appendChild(wrapper);

    return dialog;
};

export default createEditProjectDialog;