import "./sideBar.css";
import createSideBarItem from "../sideBarItem/sideBarItem";
import InboxIconLink from "../../../assets/inbox.svg";
import TodayIconLink from "../../../assets/today.svg";
import UpCompingIconLink from "../../../assets/upcoming.svg";

const createSideBar = () => {
    const sideBar = document.createElement("div");
    sideBar.className = "side-bar";

    // Add default tabs at the top
    const defaultItems = document.createElement("div");
    defaultItems.className = "default-items";
    defaultItems.appendChild(createSideBarItem(InboxIconLink, "Inbox", false));
    defaultItems.appendChild(createSideBarItem(TodayIconLink, "Today", false));
    defaultItems.appendChild(createSideBarItem(UpCompingIconLink, "Upcoming", false));
    sideBar.appendChild(defaultItems);

    // Projects section
    const projects = document.createElement("div");
    projects.className = "projects";
    projects.appendChild(createProjectsHeader());
    const projectItems = document.createElement("div");
    projectItems.className = "project-items";
    projects.appendChild(projectItems);
    sideBar.appendChild(projects);

    return sideBar;
};

const createProjectsHeader = () => {
    const header = document.createElement("div");
    header.className = "projects-header";

    const name = document.createElement("div")
    name.textContent = "Projects";
    header.appendChild(name);

    const addProjectButton = document.createElement("button");
    addProjectButton.className = "add-project-button";
    addProjectButton.textContent = "+";
    header.appendChild(addProjectButton);

    return header;
};

export default createSideBar;