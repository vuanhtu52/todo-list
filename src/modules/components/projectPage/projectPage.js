import "./projectPage.css";

const createProjectPage = projectId => {
    const page = document.createElement("div");
    page.textContent = `Project page: ${projectId}`;

    return page;
};

export default createProjectPage;