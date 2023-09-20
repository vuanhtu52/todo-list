import Project from "../models/Project";
import DatabaseController from "./DatabaseController";
import ScreenController from "./ScreenController";

const AppController = () => {
    let screenController = ScreenController();
    let databaseController = DatabaseController();
    const init = () => {
        databaseController.init();
        screenController.init();
    };

    return {
        init,
    };
};

export default AppController;