import React from 'react';

export default class Loading extends React.Component {
    render() {
        if (this.props.visible) {
            return (
                <div className='modal'>
                    <div className='spinner' />
                </div>
            )
        }
        return null;
    }
}