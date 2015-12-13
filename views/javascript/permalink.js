var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (<a id={"permalink"} href={this.props.url}>Permalink</a>)
  }
});
