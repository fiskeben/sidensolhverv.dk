var defaultOptions = {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

function GoogleMap (element, opts) {

  this.handleClick = function (event) {
    var position = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    this.deleteMarker();
    this.addMarker(position);
    this.map.setCenter(position);
    $events.emit('map-clicked', position);
  }

  this.deleteMarker = function () {
    if (this.marker !== undefined) {
      this.marker.setMap(null);
    }
  }

  this.addMarker = function (position) {
    this.marker = new google.maps.Marker({
      'position': position,
      map: this.map
    });
  }

  this.setLocation = function (position) {
    this.addMarker(position);
    this.map.setCenter(position);
    this.map.panTo(position);
  }

  var options = $.extend(defaultOptions, opts);
  this.map = new google.maps.Map(element, options);
  this.map.addListener('click', function (event) {
    this.handleClick(event);
  }.bind(this));
  $events.on('location-found', function (location) {
    this.setLocation(location);
  }.bind(this));
}

module.exports = GoogleMap;
