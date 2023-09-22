const DatabaseController = () => {
    const init = () => {
        // Add key to store projects
        if (!localStorage.getItem("projects")) {
            localStorage.setItem("projects", JSON.stringify([]));
        }

        // Create inbox project if not existing
        if (JSON.stringify(getProject("Inbox")) === "{}") {
            createProject({
                name: "Inbox",
                timeCreated: (new Date()).getTime(),
            })
        }

        // Add key to store tasks
        if (!localStorage.getItem("tasks")) {
            localStorage.setItem("tasks", JSON.stringify([]));
        }

    };

    const getProject = name => {
        const projects = JSON.parse(localStorage.getItem("projects"));
        const result = projects.filter(project => project.name === name);
        if (result.length === 0) {
            return {};
        } else {
            return result[0];
        }
    };

    const getAllProjects = () => {
        return JSON.parse(localStorage.getItem("projects"));
    };

    const createProject = project => {
        let projects = getAllProjects();
        projects.push(project);
        localStorage.setItem("projects", JSON.stringify(projects));
    };

    const updateProject =  (oldProject, newProject) => {
        let projects = getAllProjects();
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === oldProject.name) {
                projects[i] = newProject;
            }
        }
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    return {
        init,
        getProject,
        getAllProjects,
        createProject,
        updateProject,
    };
};

export default DatabaseController;