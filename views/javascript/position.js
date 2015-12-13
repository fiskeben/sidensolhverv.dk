var Position = function () {

	getPosition = function () {
		return new Promise(
			function (resolve, reject) {
				function handlePositionFound (position) {
					var latLng = {
						'lat': parseFloat(position.coords.latitude),
						'lng': parseFloat(position.coords.longitude)
					};
					$events.emit('location-found', latLng);
					resolve(latLng);
				}
				if (navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(handlePositionFound);
			  } else {
			  	reject(new Error("The browser doesn't support geolocation."));
			  }
			}
		);

	},

	getLocationFromPosition = function (position) {
		var geocoder = new google.maps.Geocoder(),
			latLng = position;
		return new Promise(
			function (resolve, reject) {
				geocoder.geocode({'location': latLng}, function (results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						resolve(results);
					} else {
						reject(new Error('Unable to find location', status));
					}
				});
			}
		);
	};

	return {
		'getPosition': getPosition,
		'getLocationFromPosition': getLocationFromPosition
	};
}

module.exports = Position;
