const organizedData = {};
const moment = require('moment-timezone');

const createdAtDate = moment(new Date('2023-10-13 05:38:46'));//new Date(item.createdAt);

// Set time to midnight for comparison
// createdAtDate.setHours(0, 0, 0, 0);
createdAtDate.startOf('day');

const currentDate = moment().startOf('day'); // Set time to midnight
// currentDate.setHours(0, 0, 0, 0); // Set time to midnight


const isToday = createdAtDate.isSame(currentDate, 'day');
const isYesterday = createdAtDate.isSame(currentDate.clone().subtract(1, 'days'), 'day');

if (isToday) {
    if (!organizedData["Today"]) {
        organizedData["Today"] = [];
    }
    organizedData["Today"].push(item);
} else if (isYesterday) {
    if (!organizedData["Yesterday"]) {
        organizedData["Yesterday"] = [];
    }
    organizedData["Yesterday"].push(item);
} else {
    const formattedDate = createdAtDate.format('YYYY-MM-DD');
    if (!organizedData[formattedDate]) {
        organizedData[formattedDate] = [];
    }
    organizedData[formattedDate].push(item);
}