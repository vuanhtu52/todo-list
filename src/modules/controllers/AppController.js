import DatabaseController from "./DatabaseController";
import ScreenController from "./ScreenController";

const AppController = () => {
    const screenController = ScreenController();
    const databaseController = DatabaseController();
    
    const init = () => {
        databaseController.init();
        screenController.init();
    };

    return {
        init,
    };
};

export default AppController;