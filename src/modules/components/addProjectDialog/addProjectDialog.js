import "./addProjectDialog.css";

const createAddProjectDialog = () => {
    // Add the dialog
    const dialog = document.createElement("dialog");
    dialog.className = "add-project-dialog";

    // Add the wrapper for content
    const wrapper = document.createElement("div");
    

    // Add the header
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = "Add project";
    wrapper.appendChild(header);

    // Add the input for project name
    const form = document.createElement("div");
    form.className = "form";
    const label = document.createElement("label");
    label.textContent = "Name";
    form.appendChild(label);
    const input = document.createElement("input");
    form.appendChild(input);
    wrapper.appendChild(form);

    // Add the buttons
    const bottomRow = document.createElement("div");
    bottomRow.className = "bottom-row";
    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button";
    cancelButton.textContent = "Cancel";
    bottomRow.appendChild(cancelButton);
    const addButton = document.createElement("button")
    addButton.className = "add-button";
    addButton.textContent = "Add";
    addButton.disabled = true;
    bottomRow.appendChild(addButton);
    wrapper.appendChild(bottomRow);

    dialog.appendChild(wrapper);

    return dialog;
};

export default createAddProjectDialog;