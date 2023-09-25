import "./addProjectDialog.css";

const createAddProjectDialog = () => {
    // Add the dialog
    const dialog = document.createElement("dialog");
    dialog.className = "add-project-dialog";

    // Add the form
    const form = document.createElement("form");
    form.action = "#";
    form.method = "post";
    form.noValidate = true;
    form.className = "form";
    
    // Add the header
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = "Add project";
    form.appendChild(header); 

    // Add label and input
    const formField = document.createElement("form-field");
    const label = document.createElement("label");
    label.for = "project-name";
    label.textContent = "Name";
    formField.appendChild(label);
    const input = document.createElement("input");
    input.type = "text";
    input.id = "project-name";
    formField.appendChild(input);
    const errorMessage = document.createElement("span");
    errorMessage.className = "error-message";
    errorMessage.ariaLive = "polite";
    formField.appendChild(errorMessage);
    form.appendChild(formField);

    // Add the buttons
    const buttons = document.createElement("div");
    buttons.className = "buttons";
    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button";
    cancelButton.textContent = "Cancel";
    buttons.appendChild(cancelButton);
    form.appendChild(buttons);
    const addButton = document.createElement("button")
    addButton.className = "add-button";
    addButton.textContent = "Add";
    addButton.disabled = true;
    buttons.appendChild(addButton);

    dialog.appendChild(form);

    return dialog;
}

export default createAddProjectDialog;