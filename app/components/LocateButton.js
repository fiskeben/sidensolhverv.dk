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
            <button onClick={this.onClick} className='locate-button'>
                <div className='locate-symbol'></div>
                <div className='locate-text'>Find mig</div>
            </button>
        </div>
    }
}