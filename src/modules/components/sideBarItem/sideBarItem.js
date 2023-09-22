import "./sideBarItem.css";
import EditIconLink from "../../../assets/edit.svg";
import DeleteIconLink from "../../../assets/delete.svg";

const createSideBarItem = (imageLink, name, editable) => {
    // Add item 
    const item = document.createElement("div");
    item.className = "sidebar-item";
    item.id = name;

    // Add wrapper for icon and text
    const itemContent = document.createElement("div");
    itemContent.className = "item-content";

    // Add icon
    const image = new Image();
    image.src = imageLink;
    itemContent.appendChild(image);

    // Add text
    const itemName = document.createElement("div");
    itemName.textContent = name;
    itemContent.appendChild(itemName);

    item.appendChild(itemContent);

    // Add the edit and delete buttons
    if (editable) {
        const itemButtons = document.createElement("div");
        itemButtons.className = "item-buttons";

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        const editIcon = new Image();
        editIcon.src = EditIconLink;
        editButton.appendChild(editIcon);
        itemButtons.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        const deleteIcon = new Image();
        deleteIcon.src = DeleteIconLink;
        deleteButton.appendChild(deleteIcon);
        itemButtons.appendChild(deleteButton);
        
        item.appendChild(itemButtons);
    }

    return item;
};

export default createSideBarItem;