const Functions = {};
const moment = require('moment-timezone');

Functions.decimalToHexString = (number) => {
    if (number < 0)
        number = 0xFFFFFFFF + number + 1;
    return number.toString(16).toUpperCase();
}

Functions.makeNDigits = function (cardNumber, num) {
    while (cardNumber.length < num) {
        cardNumber = "0" + cardNumber
    }
    return cardNumber
}

Functions.get12DigitsExcludingLastDigit = function (cardNumber) {
    var num = ""
    for (let i = 3; i < cardNumber.length - 1; i++) {
        num += cardNumber[i]
    }
    //console.log("12 digit number : ",num)
    return num
}

Functions.bitwiseXorHexString = function (pinBlock1, pinBlock2) {
    var result = ''
    for (let index = 0; index < 16; index++) {
        const temp = (parseInt(pinBlock1.charAt(index), 16) ^ parseInt(pinBlock2.charAt(index), 16)).toString(16).toUpperCase()
        result += temp
    }
    return result
}

Functions.bitwiseXorHexStringFor32Bit = function (a, b) {
    var res = "",
        l = Math.max(a.length, b.length);
    for (var i = 0; i < l; i += 4)
        res = ("000" + (parseInt(a.slice(-i - 4, -i || a.length), 16) ^ parseInt(b.slice(-i - 4, -i || b.length), 16)).toString(16)).slice(-4) + res;
    return res;
}

Functions.convert32To16Hex = function (hex) {
    var hex16 = ""
    for (let i = 0; i < hex.length; i += 2) {
        var temp = hex[i] + "" + hex[i + 1]
        hex16 += parseInt(temp, 16).toString(16).toUpperCase();
    }
    return hex16
}

Functions.getLast4digits = function (str = "") {
    return str.substr(str.length - 4)
}

Functions.sorting = (data = []) => {
    let newData = {};
    data.forEach(item => {
        if (newData[item.userId]) {
            newData[item.userId].push(item);
        } else {
            newData[item.userId] = [item];
        }
    })
    return newData;
}

Functions.calculateHoursBetweenDates = (startDateTime, endDateTime) => {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    const timeDifference = end - start;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    return hoursDifference;
}

Functions.getTokenExpiry = function () {
    var dt = new Date()
    dt.setHours(dt.getHours() + 2)
    return dt.toISOString().split('T')[0] + " " + dt.toISOString().split('T')[1].slice(0, -1);
}

Functions.getCurrentDateOfNextMonth = function () {
    var now = new Date();
    if (now.getMonth() == 11) {
        var current = new Date(now.getFullYear() + 1, 0, 1);
    } else {
        var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
}

Functions.organizeByDateN = (inputData) => {

    return inputData;
}

Functions.organizeByDate = (inputData) => {
    moment.tz.setDefault('America/Toronto');
    const organizedData = {};
    const currentDate = moment().startOf('day'); // Set time to midnight

    inputData.forEach(item => {

        const createdAtDate = moment(new Date(item.createdAt));//new Date(item.createdAt);
        item.createdAt = createdAtDate.format('YYYY-MM-DD HH:mm:ss');
        const createdAtDate2 = moment(item.createdAt).format('YYYY-MM-DD');

        const TodayDate = moment().format('YYYY-MM-DD');
        const YesterdayDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

        //console.log(item.botId +  item.createdAt + createdAtDate3);

        const isToday = createdAtDate2 === TodayDate;
        const isYesterday = createdAtDate2 === YesterdayDate;

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

    });

    // console.log("*********");
    // console.log(organizedData);
    return organizedData;
}

Functions.organizeByDate2 = (inputData) => {
    moment.tz.setDefault('America/Toronto');
    const organizedData = {};
 
    const currentDate = new Date();
    // currentDate.setHours(0, 0, 0, 0); // Set time to midnight

    inputData.forEach(item => {
        const createdAtDate = new Date(item.createdAt);
        // createdAtDate.setHours(0, 0, 0, 0); // Set time to midnight

        const daysDifference = Math.floor((currentDate - createdAtDate) / (1000 * 60 * 60 * 24));
        console.log(item.createdAt, createdAtDate, currentDate, daysDifference);
        if (daysDifference === 0) {
            if (!organizedData["Today"]) {
                organizedData["Today"] = [];
            }
            organizedData["Today"].push(item);
        } else if (daysDifference === 1) {
            if (!organizedData["Yesterday"]) {
                organizedData["Yesterday"] = [];
            }
            organizedData["Yesterday"].push(item);
        } else {
            const formattedDate = createdAtDate.toDateString();
            if (!organizedData[formattedDate]) {
                organizedData[formattedDate] = [];
            }
            organizedData[formattedDate].push(item);
        }
    });

    return organizedData;
}



module.exports = Functions;
