import "./editTaskDialog.css";

const createEditTaskDialog = projects => {
    const dialog = document.createElement("dialog");
    dialog.className = "edit-task-dialog";

    const wrapper = document.createElement("div");

    // Add name section
    const nameTextBox = document.createElement("span");
    nameTextBox.role = "textbox";
    nameTextBox.contentEditable = "true";
    wrapper.appendChild(nameTextBox);

    // Add description section
    const descriptionTextBox = document.createElement("span");
    descriptionTextBox.role = "textbox";
    descriptionTextBox.contentEditable = "true";
    wrapper.appendChild(descriptionTextBox);

    // Add section for date picker and priority dropdown
    const middleRow = document.createElement("div");
    middleRow.className = "middle-row";
    middleRow.appendChild(createDatePicker());
    middleRow.appendChild(createDropdown(["Priority 1", "Priority 2", "Priority 3", "Priority 4"], "Priority"));
    wrapper.appendChild(middleRow);

    // Add the bottom row
    const bottomRow = document.createElement("div");
    bottomRow.className = "bottom-row";
    bottomRow.appendChild(createDropdown(projects.map(project => project.name)));
    const div = document.createElement("div");
    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button";
    cancelButton.textContent = "Cancel";
    div.appendChild(cancelButton);
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "save-button";
    div.appendChild(saveButton);
    bottomRow.appendChild(div);
    wrapper.appendChild(bottomRow);

    dialog.appendChild(wrapper);

    return dialog;
};

const createDatePicker = () => {
    const wrapper = document.createElement("div");

    const label = document.createElement("div");
    label.textContent = "Due date"
    wrapper.appendChild(label);

    const picker = document.createElement("input");
    picker.type = "date";
    wrapper.appendChild(picker);

    return wrapper;
};

const createDropdown = (options, labelName) => {
    const wrapper = document.createElement("div");

    if (labelName) {
        const label = document.createElement("div");
        label.textContent = labelName;
        wrapper.appendChild(label);
    }

    const dropdown = document.createElement("select");
    options.forEach(option => {
        dropdown.appendChild(createOption(option));
    });
    wrapper.appendChild(dropdown);

    return wrapper;
};

const createOption = value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;

    return option;
};

export default createEditTaskDialog;