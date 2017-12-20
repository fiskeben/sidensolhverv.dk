import React from 'react';
import ShareDialog from './ShareDialog';

export default class SharableLink extends React.Component {
    constructor(props) {
        super(props);
        this.share = this.share.bind(this);
        this.state = { showDialog: false };
    }

    share(e) {
        e.preventDefault();
        const url = e.target.href;
        this.setState(
            Object.assign({}, this.state, { showDialog: true, url })
        );
    }

    render() {
        let url = window.location.href;

        const slashPosition = url.indexOf('/', 10);
        if (slashPosition === -1) {
            url = `${url}/`;
        } else {
            url = url.substring(0, slashPosition + 1);
        }

        url = `${url}?date=${this.props.date.toJSON()}&coords=${this.props.lat},${this.props.lng}`;
        
        return <div>
                <a href={url} onClick={(e) => { this.share(e) }}>Del</a>
                <ShareDialog visible={this.state.showDialog} url={this.state.url} />
            </div>
    }
}