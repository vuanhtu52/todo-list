import "./sideBar.css";
import InboxIconLink from "./icons/inbox.svg";
import TodayIconLink from "./icons/today.svg";
import UpCompingIconLink from "./icons/upcoming.svg";

const createItem = (imageLink, text) => {
    const item = document.createElement("div");
    item.className = "sidebar-item";
    
    const image = new Image();
    image.src = imageLink;
    item.appendChild(image);

    const itemName = document.createElement("div");
    itemName.textContent = text;
    item.appendChild(itemName);

    return item;
}; 

const createProjectsHeader = () => {
    const header = document.createElement("div");
    header.className = "projects-header";

    const name = document.createElement("div")
    name.textContent = "Projects";
    header.appendChild(name);

    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+";
    header.appendChild(addProjectButton);

    return header;
};

const createSideBar = () => {
    const sideBar = document.createElement("div");
    sideBar.className = "side-bar";

    // Add default tabs at the top
    const defaultItems = document.createElement("div");
    defaultItems.className = "default-items";
    defaultItems.appendChild(createItem(InboxIconLink, "Inbox"));
    defaultItems.appendChild(createItem(TodayIconLink, "Today"));
    defaultItems.appendChild(createItem(UpCompingIconLink, "Upcoming"));
    sideBar.appendChild(defaultItems);

    // Projects section
    const projects = document.createElement("div");
    projects.appendChild(createProjectsHeader());
    sideBar.appendChild(projects);

    return sideBar;
};

export default createSideBar;