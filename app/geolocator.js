const axios = require('axios');

module.exports.locate = (coords) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}`)
    .then(
        res => {
            if (Array.isArray(res.data.results)) {
                if (res.data.results.length > 3) {
                    return res.data.results[3].formatted_address;
                }
                return res.data.results[res.data.results.length - 1];
            }
            return 'ukendt';
        },
        err => {
            console.error('Error getting address for location', coords);
        }
    )
}