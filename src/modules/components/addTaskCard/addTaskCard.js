import "./addTaskCard.css";

const createAddTaskCard = () => {
    const card = document.createElement("div");
    card.textContent = "add task card";

    return card;
};

export default createAddTaskCard;