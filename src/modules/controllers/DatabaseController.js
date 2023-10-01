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

    const getOverdueTasks = today => {
        let tasks = getAllTasks();
        tasks = tasks.filter(task => task.dueDate < today.getTime());
        return tasks;
    };

    const getTasksByDueDate = date => {
        let tasks = getAllTasks();
        tasks = tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate.getDate() === date.getDate() && dueDate.getMonth() === date.getMonth() && dueDate.getFullYear() === date.getFullYear();
        });
        return tasks;
    };

    const getTasksOfTheWeek = date => {
        let tasks = getAllTasks();
        const monday = _getMonday(date);
        const sunday = new Date(monday);
        sunday.setDate(sunday.getDate() + 7);
        sunday.setMilliseconds(sunday.getMilliseconds() - 1);

        tasks = tasks.filter(task => task.dueDate >= monday.getTime() && task.dueDate <= sunday.getTime());

        return tasks;
    };

    // Get monday of the week
    const _getMonday = date => {
        const monday = new Date(date);
        if (date.getDay() !== 0) {
            monday.setDate(date.getDate() - (date.getDay() - 1));
        } else { // Adjust formula for Sunday
            monday.setDate(date.getDate() - 6);
        }

        monday.setHours(0);
        monday.setMinutes(0);
        monday.setSeconds(0);
        monday.setMilliseconds(0);

        return monday;
    };

    const updateTask = (oldTask, newTask) => {
        let tasks = getAllTasks();
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === oldTask.id) {
                tasks[i] = newTask;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
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
        getOverdueTasks,
        getTasksByDueDate,
        getTasksOfTheWeek,
        updateTask,
        deleteTask,
    };
};

export default DatabaseController;