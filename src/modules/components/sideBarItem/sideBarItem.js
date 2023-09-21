import "./sideBarItem.css";

const createSideBarItem = (imageLink, name, editable) => {
    const item = document.createElement("div");
    item.className = "sidebar-item";
    item.id = name;

    const image = new Image();
    image.src = imageLink;
    item.appendChild(image);

    const itemName = document.createElement("div");
    itemName.textContent = name;
    item.appendChild(itemName);

    return item;
};

export default createSideBarItem;