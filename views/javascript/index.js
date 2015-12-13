var React = require('react'),
  ReactDOM = require('react-dom'),
  EventEmitter = require('events').EventEmitter,
  MessagePane = require('./message-pane'),
  GoogleMap = require('./google-maps'),
  googleMap;

window.$events = new EventEmitter();
googleMap = new GoogleMap(document.getElementById('map_canvas'), {center: {lat: 60, lng: 7 }});

ReactDOM.render(<MessagePane />, document.getElementById('messagepane'));
