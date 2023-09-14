import "./navBar.css";
import LogoLink from "./icons/logo.svg";

const createLogo = () => {
    // Create the logo wrapper outside
    const logo = document.createElement("div");
    logo.className = "logo";

    // Create the icon
    const image = new Image();
    image.src = LogoLink;
    logo.appendChild(image);

    // Create the text
    const text = document.createElement("div");
    text.textContent = "Todo List";
    logo.appendChild(text);

    return logo
};

const createNavBar = () => {
    const navBar = document.createElement("div");
    navBar.className = "nav-bar";

    const logo = createLogo();
    navBar.appendChild(logo);

    return navBar;
};

export default createNavBar;