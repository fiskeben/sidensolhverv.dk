const solstices = [
    new Date(2012, 5, 20, 5, 14),
    new Date(2012, 11, 21, 11, 12),
    new Date(2013, 5, 21, 5, 4),
    new Date(2013, 11, 21, 17, 11),
    new Date(2014, 5, 21, 10, 51),
    new Date(2014, 11, 21, 23, 3),
    new Date(2015, 5, 21, 16, 38),
    new Date(2015, 11, 22, 4, 48),
    new Date(2016, 5, 20, 22, 34),
    new Date(2016, 11, 21, 10, 44),
    new Date(2017, 5, 21, 4, 24),
    new Date(2017, 11, 21, 16, 28),
    new Date(2018, 6, 21, 10, 7),
    new Date(2018, 11, 21, 22, 23),
    new Date(2019, 5, 21, 15, 54),
    new Date(2019, 11, 22, 4, 19),
    new Date(2020, 5, 20, 21, 44),
    new Date(2020, 11, 21, 10, 2)
];

module.exports.getPreviousWinterSolstice = (date) => {
    const timestamp = date.getTime();
    return solstices.find((d) => {
        const t = d.getTime();
        return t < timestamp && timestamp - t < 31556926000 && d.getMonth() === 11;
    });
}

module.exports.getNextSolstice = (date) => {
    const timestamp = date.getTime();
    return solstices.find((d) => {
        const t = d.getTime();
        return t > timestamp && t - timestamp < 15778463000;
    });
}

module.exports.getPreviousSolstice = (date) => {
    const timestamp = date.getTime();
    return solstices.find((d) => {
        const t = d.getTime();
        return t < timestamp && timestamp - t < 15798463000;
    });
}