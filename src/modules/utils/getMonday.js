// Get monday of the week based on the input date
const getMonday = date => {
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

export default getMonday;