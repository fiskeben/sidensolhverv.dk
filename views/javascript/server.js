var Server = function () {
	var getDataForLocation = function (location, date) {
		var payload = location;
		if (date !== undefined) {
			payload.date = date;
		}
    return $.ajax({
      url: "/api/v1/calculate",
      type: 'get',
      data: payload
    });
	};

	return {
		'getDataForLocation': getDataForLocation
	};

};

module.exports = Server;
