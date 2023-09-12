import "./style.css";
import createNavBar from "./navBar/navBar";

const loadPage = () => {
    const body = document.querySelector("body");

    const navBar = createNavBar();
    body.appendChild(navBar);
}

loadPage();