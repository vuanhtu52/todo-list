import "./upcomingPage.css";

const createUpcomingPage = () => {
    const upcomingPage = document.createElement("div");
    upcomingPage.className = "upcoming-page";
    upcomingPage.textContent = "upcoming page";

    return upcomingPage;
};

export default createUpcomingPage;