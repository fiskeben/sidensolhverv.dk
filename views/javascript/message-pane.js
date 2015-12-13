var React = require('react'),
  EmptyPane = require('./empty-pane'),
  DataPane = require('./data-pane'),
  Social = require('./social'),
  Server = require('./server'),
  Position = require('./position');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      hours: undefined,
      minutes: undefined,
      date: undefined,
      difference: undefined,
      location: undefined,
      dayLengthHours: undefined,
      dayLengthMinutes: undefined
    };
  },

  getData: function (location, date) {
    var server = new Server(),
      position = new Position(),
      dataPromise = server.getDataForLocation(location, date),
      locationPromise = position.getLocationFromPosition(location);

    Promise.all([dataPromise, locationPromise]).then(
      function (values) {
        var data = values[0],
          nameOfLocation = values[1][3].formatted_address,
          position = values[1][3].geometry.location;

        this.setState({
          hours: data.hours,
          minutes: data.minutes,
          date: data.date.interpreted,
          difference: data.difference,
          location: nameOfLocation,
          position: position,
          dayLengthHours: data.day_length.hours,
          dayLengthMinutes: data.day_length.minutes
        })
      }.bind(this),
      function (error) {
        alert('An error occurred getting data', error);
      }
    ).catch(function (err) { console.log('oh noes', err)});
  },

  componentDidMount: function () {
    $events.on('map-clicked', this.getData);

    var position = new Position();

    if (window.presets === undefined) {
      position.getPosition().then(
        function (location) {
          this.getData(location);
        }.bind(this),
        function (error) {
          alert(error);
        }
      );
    } else {
      var presetPosition = {
        'lat': parseFloat(window.presets.latitude),
        'lng': parseFloat(window.presets.longitude)
      };
      this.getData(presetPosition, window.presets.date);
      $events.emit('location-found', presetPosition);
    }
  },
  
  render: function () {
    var pane,
      shareUrl = "/";

    if (this.state.date && this.state.position) {
      shareUrl += "?date=" + this.state.date + "&lat=" + this.state.position.lat() + "&lng=" + this.state.position.lng();
    }

    if (this.state.hours === undefined && this.state.minutes === undefined) {
      pane = <EmptyPane />;
    } else {
      pane = <DataPane data={this.state} />;
    }

    return (
      <div>
        <div className={"jumbotron col-md-10"}>
          {pane}
        </div>
        <Social url={shareUrl} title={"Hvor meget er dagen tiltaget?"} />
      </div>
    );
  }
});
