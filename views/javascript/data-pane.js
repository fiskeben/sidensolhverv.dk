var React = require('react'),
  DateFormatter = require('./date');

module.exports = React.createClass({
  pluralize: function (value, singular, plural) {
    if (Math.abs(value) === 1) {
      return singular;
    }
    return plural;
  },

  render: function () {
    var data = this.props.data,
      hourMessage,
      minuteMessage,
      difference,
      moreOrLess = 'mere',
      verb = 'tiltaget',
      dateFormatter = new DateFormatter(),
      date = dateFormatter.createDate(data.date);

    if (data.hours !== 0) {
      hourMessage = <h2>{Math.abs(data.hours)} {this.pluralize(data.hours, 'time', 'timer')}</h2>;
    }

    if (data.minutes !== 0) {
      minuteMessage = <h2>{Math.abs(data.minutes)} {this.pluralize(data.minutes, 'minut', 'minutter')}</h2>;
    }

    if (data.difference < 0) {
      verb = 'aftaget';
      moreOrLess = 'mindre';
    }

    return (
      <div>
        <p className="lead">
          {date} er dagen i {data.location} {verb} med
        </p>
        {hourMessage}
        {minuteMessage}
        <p className="lead">
          Det er {Math.abs(data.difference)} {this.pluralize(data.difference, 'minut', 'minutter')} {moreOrLess} end i går.
        </p>
      </div>
    );
  }
});
