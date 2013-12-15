var Map = (function ($) {

	var
		map, marker,

		getDefaultPosition = function () {
			 return new google.maps.LatLng(55.5, 9.5);
		},

		getNameOfLocation = function (locationData, map) {
			var address;

			if (map.zoom <= 5) {
				address = locationData[locationData.length - 2];
			} else if (map.zoom <= 12) {
				address = locationData[Math.floor((locationData.length - 1) / 2)];
			} else {
				address = locationData[0];
			}
			return address.formatted_address;
		},

		updatePositionAndText = function (location) {
			var getLocationPromise = Position.getLocation(location),
				getDataPromise = Server.getDataForLocation(location);
      
      marker = addPositionToMap(location, map);
      map.setCenter(location);
      
      $.when(getLocationPromise, getDataPromise)
      	.then(function (locationResponse, dataResponse) {
      		var nameOfLocation = getNameOfLocation(locationResponse, map);
      		Template.update(nameOfLocation, dataResponse[0]);
      	}, function (error) {
      		Template.error();
      	}
      );
		},

		placeMarker = function (location) {
			updatePositionAndText(location);
		},

		removeMarker = function (marker) {
      if (marker) {
        marker.setMap(null);
      }
    },

		addPositionToMap = function (latLng, map) {
  		var aMarker = new google.maps.Marker({
    		'position': latLng,
    		'map': map
  		});
  		return aMarker;
		},

		initialize = function (canvas, options) {
			var mapOptions = $.extend({
				zoom: 4,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}, options),
				canvasObject = (typeof canvas === 'string')
					? $(canvas).get(0)
					: canvas;

			mapOptions.center = getDefaultPosition();

			map = new google.maps.Map(canvasObject, mapOptions);

			google.maps.event.addListenerOnce(map, 'idle', function() {
    		Position.getPosition(function (position) {
    			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    		updatePositionAndText(latLng);
				});
			});

			google.maps.event.addListener(map, 'click', function (event) {
				removeMarker(marker);
				placeMarker(event.latLng);
			});
		};

	return {
		'initialize': initialize,
		'addPositionToMap': addPositionToMap
	};

}(jQuery));

var Position = (function () {
	var
		handleDetectedPosition = function (detectedPosition) {
      var coords = detectedPosition.coords,
        somePosition = new google.maps.LatLng(coords.latitude, coords.longitude);
      console.log("position handled");
      placeMarker(somePosition);
    },

		getPosition = function (cb) {
			if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(cb);
		  } else {
		  	cb(undefined);
		  }
		},

		getLocation = function (position) {
			var deferred = $.Deferred(),
				geocoder = new google.maps.Geocoder();

			geocoder.geocode({'latLng': position}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					deferred.resolve(results);
				} else {
					deferred.fail();
				}
			});

			return deferred.promise();
		};

		return {
			'getPosition': getPosition,
			'getLocation': getLocation
		};
}());

var Server = (function ($) {
	var
		getDataForLocation = function (location) {
			var payload = { lat: location.lat(), lng: location.lng() };
      return $.ajax({
        url: "/api/v1/calculate",
        type: 'post',
        data: payload
      });
		};

	return {
		'getDataForLocation': getDataForLocation
	};

}(jQuery));

var Template = (function ($, Handlebars) {
	var
		getTemplate = function (templateName) {
			var templateSource = $('#' + templateName).html(),
				template = Handlebars.compile(templateSource);
			return template;
		},

		createPermalink = function (data) {
			var link = [];
      link.push('http://sidensolhverv.dk/?date=');
      link.push(DateModule.createISOdate(data.date.interpreted));
      link.push('&lat=');
      link.push(data.latlng.lat);
      link.push('&lng=');
      link.push(data.latlng.lng);
      
      return link.join('');
		},

		update = function (location, result) {
			var template = getTemplate('template'),	
				templateData = $.extend(true, {}, result),
				html, permalink;

			templateData.date = DateModule.createDate(result.date.interpreted);
			templateData.place = location;

			templateData.verb = (result.difference > 0)
				? 'tiltaget'
				: 'aftaget';

			templateData.direction = (result.difference > 0)
				? 'mere'
				: 'mindre';

			templateData.difference = Math.abs(result.difference);

			templateData.solstice = DateModule.createDate(result.solstice);

			html = template(templateData);
			$('#messagepane').html(html);

			permalink = createPermalink(result);
      $("#permalink").attr('href', permalink);
			
			//$.cookie("latitude", payload.lat);
      //$.cookie("longitude", payload.lng);
		},

		error = function () {
			$(".jumbotron").html('<div class="alert alert-error">Dagens længde kunne ikke beregnes for denne position</div>');
		};

	Handlebars.registerHelper('plural', function (number, noun, plu) {
		var result = noun;
		if (number !== 1) {
			result += plu;
		}
		return result;
	});

	return {
		'update': update,
		'error': error
	};

}(jQuery, Handlebars));

var DateModule = (function () {
	var months = [
	    'januar',
	    'februar',
	    'marts',
	    'april',
	    'maj',
	    'juni',
	    'juli',
	    'august',
	    'september',
	    'oktober',
	    'november',
	    'december'
    ],

		createDate = function (date) {
      var d = getDateFromString(date);
      var string = [];
      string.push(d.getDate());
      string.push('. ');
      string.push(months[d.getMonth()]);
      string.push(' ');
      string.push(d.getFullYear());
      return string.join('');
    },
        
    getDateFromString = function (date) {
      var date_parts = date.toString().split('-');
      var d = new Date();
      d.setYear(date_parts[0]);
      d.setMonth(date_parts[1] - 1);
      d.setDate(date_parts[2]);
      return d;
    },
        
    createISOdate = function (date) {
      var d = getDateFromString(date);
      var string = [];
      string.push(d.getFullYear());
      string.push('-');
      var month = d.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      string.push(month);
      string.push('-');
      string.push(d.getDate());

      return string.join('');
    };

    return {
    	'createDate': createDate,
    	'createISOdate': createISOdate
    };
}());