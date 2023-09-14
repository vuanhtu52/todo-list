import "./inboxPage.css";

const createInboxPage = () => {
    const inboxPage = document.createElement("div");
    inboxPage.className = "inbox-page";
    inboxPage.textContent = "inbox page";

    return inboxPage;
};

export default createInboxPage;