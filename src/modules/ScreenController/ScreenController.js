import "./ScreenController.css";
import createNavBar from "../navBar/navBar";
import createSideBar from "../sideBar/sideBar";

const ScreenController = () => {
    const init = () => {
        const body = document.querySelector("body");

        // Add navbar
        const navBar = createNavBar();
        body.appendChild(navBar);
    
        // Add sidebar
        const sideBar = createSideBar();
        body.appendChild(sideBar);
    
        // Add main content
        const content = document.createElement("div");
        content.textContent = "content"
        body.appendChild(content);
    };

    return {
        init,
    }
};

export default ScreenController;