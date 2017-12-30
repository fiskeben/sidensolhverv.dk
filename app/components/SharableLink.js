import React from 'react';
import ShareDialog from './ShareDialog';

export default class SharableLink extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { showDialog: false };
    }

    onClick(e) {
        e.preventDefault();
        let url = window.location.href;

        const slashPosition = url.indexOf('/', 10);
        if (slashPosition === -1) {
            url = `${url}/`;
        } else {
            url = url.substring(0, slashPosition + 1);
        }

        url = `${url}?date=${this.props.date.toJSON()}&coords=${this.props.lat},${this.props.lng}`;

        this.setState(
            Object.assign({}, this.state, { showDialog: true, url })
        );
    }

    render() {
        return <div>
                <button onClick={this.onClick} className='action-button'>
                    <div className='action-symbol share'></div>
                    <div className='action-text'>Del</div>
                </button>
                <ShareDialog visible={this.state.showDialog} url={this.state.url} />
            </div>
    }
}