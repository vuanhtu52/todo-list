import "./addTaskCard.css";

const createAddTaskCard = () => {
    const card = document.createElement("div");
    card.className = "add-task-card";

    // Add name section
    const nameTextBox = document.createElement("textarea");
    nameTextBox.placeholder = "Task name";
    card.appendChild(nameTextBox);

    // Add description section
    const descriptionTextBox = document.createElement("textarea");
    descriptionTextBox.placeholder = "Description";
    card.appendChild(descriptionTextBox);

    // Add section for date picker and priority dropdown
    const middleRow = document.createElement("div");
    middleRow.appendChild(createDatePicker());
    middleRow.appendChild(createPriorityDropDown());
    card.appendChild(middleRow);

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
}

const createPriorityDropDown = () => {
    const wrapper = document.createElement("div");

    const label = document.createElement("div");
    label.textContent = "Priority";
    wrapper.appendChild(label);

    const dropDown = document.createElement("select");
    dropDown.appendChild(createOption("Priority 1"));
    dropDown.appendChild(createOption("Priority 2"));
    dropDown.appendChild(createOption("Priority 3"));
    dropDown.appendChild(createOption("Priority 4"));
    wrapper.appendChild(dropDown);

    return wrapper;
}

const createOption = value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;

    return option;
}

export default createAddTaskCard;