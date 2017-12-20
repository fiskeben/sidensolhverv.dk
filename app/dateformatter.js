module.exports.format = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthString = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'][month];

    return `${day}. ${monthString} ${year}`;
}
