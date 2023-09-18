import "./addTaskCard.css";

const createAddTaskCard = () => {
    const card = document.createElement("div");
    card.className = "add-task-card";

    // Add name section
    const nameTextBox = document.createElement("span");
    nameTextBox.role = "textbox";
    nameTextBox.contentEditable = "true";
    card.appendChild(nameTextBox);

    // Add description section
    const descriptionTextBox = document.createElement("span");
    descriptionTextBox.role = "textbox";
    descriptionTextBox.contentEditable = "true";
    card.appendChild(descriptionTextBox);

    // Add section for date picker and priority dropdown
    const middleRow = document.createElement("div");
    middleRow.className = "middle-row";
    middleRow.appendChild(createDatePicker());
    middleRow.appendChild(createDropdown(["Priority 1", "Priority 2", "Priority 3", "Priority 4"], "Priority"));
    card.appendChild(middleRow);

    // Add the bottom row
    const bottomRow = document.createElement("div");
    bottomRow.className = "bottom-row";
    bottomRow.appendChild(createDropdown(["Inbox", "Today", "Upcoming"]));
    const div = document.createElement("div");
    const cancelButton = document.createElement("button");
    cancelButton.className = "card-cancel-button";
    cancelButton.textContent = "Cancel";
    div.appendChild(cancelButton);
    const addButton = document.createElement("button");
    addButton.textContent = "Add task";
    addButton.className = "card-add-button";
    addButton.disabled = true;
    div.appendChild(addButton);
    bottomRow.appendChild(div);
    card.appendChild(bottomRow);

    return card;
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

export default createAddTaskCard;