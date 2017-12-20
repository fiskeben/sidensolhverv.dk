import { getNextSolstice, getPreviousSolstice, getPreviousWinterSolstice } from './solstices';

const axis = 23.439;
const j = 0.01720242383;
const INCREASING = 'increasing';
const DECREASING = 'decreasing';

const calculate = (lat, lng, date) => {
    return Promise.resolve(calculateSync(lat, lng, date));
}

const calculateSync = (lat, lng, date) => {
    const date_yesterday = yesterday(date);
    
    const previousWinterSolstice = getPreviousWinterSolstice(date);
    const solstice = getPreviousSolstice(date);
    const daysSinceSolstice = daysBetween(date, solstice);
    const daysSinceSolsticeYesterday = daysBetween(date_yesterday, solstice);
    const lengthOfDay = dayLength(lat, daysSinceSolstice);
    const lengthOfYesterday = dayLength(lat, daysSinceSolsticeYesterday);
    const lengthOfDayAtSolstice = dayLength(lat, 0);
    const difference = Math.abs(lengthOfDayAtSolstice - lengthOfDay);
    const differenceSinceYesterday = Math.round(lengthOfDay - lengthOfYesterday);
    const hours = Math.floor(difference / 60);
    const minutes = Math.floor(difference % 60);
    const direction = (solstice.getMonth() === 11) ? INCREASING : DECREASING;

    return {
        date,
        lengthOfDay,
        hours,
        minutes,
        solstice,
        difference: differenceSinceYesterday,
        direction
    };
}

const degreesToRadians = (degreeValue) => degreeValue * Math.PI / 180;

const dayLength = (latitude, daysSinceSolstice) => {
    const latitudeInRadians = degreesToRadians(latitude);
    const axisInRadians = degreesToRadians(axis);

    let m = 1.0 - Math.tan(latitudeInRadians) * Math.tan(axisInRadians * Math.cos(j * daysSinceSolstice));
    if (m < 0) {
        m = 0.0;
    } else if (m > 2) {
        m = 2.0;
    }

    const b = Math.acos(1.0 - m) / Math.PI;
    const res = 60.0 * 24.0 * b;
    return res;
}

const yesterday = (date) => {
    const timestamp = date.getTime();
    return new Date(timestamp - 86400000);
}

const daysBetween = (someDate, anotherDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const difference = Math.abs(someDate.getTime() - anotherDate.getTime());
    const days = Math.floor(difference / oneDay);
    return days;
}

module.exports.calculate = calculate;
module.exports.calculateSync = calculateSync;
module.exports.INCREASING = INCREASING;
module.exports.DECREASING = DECREASING;
