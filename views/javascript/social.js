var React = require('react'),
  ReactShare = require('react-share'),
  FacebookShareButton = ReactShare.ShareButtons.FacebookShareButton,
  TwitterShareButton = ReactShare.ShareButtons.TwitterShareButton,
  GooglePlusShareButton = ReactShare.ShareButtons.GooglePlusShareButton,
  FacebookIcon = ReactShare.generateShareIcon('facebook'),
  TwitterIcon = ReactShare.generateShareIcon('twitter'),
  GooglePlusIcon = ReactShare.generateShareIcon('google'),
  Permalink = require('./permalink');

module.exports = React.createClass({
  render: function () {
    return (
      <div className={"col-md-2 social"}>

        <FacebookShareButton url={this.props.url} title={this.props.title}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>

        <TwitterShareButton url={this.props.url} title={this.props.title}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

        <GooglePlusShareButton url={this.props.url}>
          <GooglePlusIcon size={32} round={true} />
        </GooglePlusShareButton>

        <Permalink url={this.props.url} />

      </div>
    );
  }
});
