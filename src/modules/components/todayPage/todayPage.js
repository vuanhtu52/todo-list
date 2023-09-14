import "./todayPage.css";

const createTodayPage = () => {
    const todayPage = document.createElement("div");
    todayPage.className = "today-page";
    todayPage.textContent = "today page";

    return todayPage;
};

export default createTodayPage;