import React from 'react';

export default class LocateButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.locate();
    }

    render() {
        return <div>
            <button onClick={this.onClick} className='action-button'>
                <div className='action-symbol locate'></div>
                <div className='action-text'>Find mig</div>
            </button>
        </div>
    }
}