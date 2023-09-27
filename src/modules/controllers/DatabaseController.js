import { v4 as uuidv4 } from "uuid";

const DatabaseController = () => {
    const init = () => {
        // Add key to store projects
        if (!localStorage.getItem("projects")) {
            localStorage.setItem("projects", JSON.stringify([]));
        }

        // Create inbox project if not existing
        if (JSON.stringify(getProjectByName("Inbox")) === "{}") {
            createProject({
                id: "Inbox",
                name: "Inbox",
                timeCreated: (new Date()).getTime(),
            })
        }

        // Add key to store tasks
        if (!localStorage.getItem("tasks")) {
            localStorage.setItem("tasks", JSON.stringify([]));
        }

    };

    const createProject = project => {
        let projects = getAllProjects();
        projects.push(project);
        localStorage.setItem("projects", JSON.stringify(projects));
    };

    const getProjectById = id => {
        const projects = JSON.parse(localStorage.getItem("projects"));
        const result = projects.filter(project => project.id === id);
        if (result.length === 0) {
            return {};
        } else {
            return result[0];
        }
    };

    const getProjectByName = name => {
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

    const updateProject = (oldProject, newProject) => {
        let projects = getAllProjects();
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === oldProject.id) {
                projects[i] = newProject;
            }
        }
        localStorage.setItem("projects", JSON.stringify(projects));
    };

    const deleteProject = id => {
        let projects = getAllProjects();
        projects = projects.filter(project => project.id !== id);
        localStorage.setItem("projects", JSON.stringify(projects));
    };

    const createTask = task => {
        let tasks = getAllTasks();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const getAllTasks = () => {
        return JSON.parse(localStorage.getItem("tasks"));
    };

    const getTasksByProjectId = projectId => {
        const tasks = getAllTasks();
        const result = tasks.filter(task => task.projectId === projectId);

        return result;
    };

    const getTaskById = id => {
        const tasks = getAllTasks();
        for (let task of tasks) {
            if (task.id === id) {
                return task;
            }
        }
        return {};
    };

    const deleteTask = id => {
        let tasks = getAllTasks();
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    return {
        init,
        getProjectById,
        getProjectByName,
        getAllProjects,
        createProject,
        updateProject,
        deleteProject,
        createTask,
        getAllTasks,
        getTasksByProjectId,
        getTaskById,
        deleteTask,
    };
};

export default DatabaseController;