import React from 'react';
import { INCREASING, DECREASING } from '../calculator';

export default class Location extends React.Component {
    render() {
        const direction = (this.props.direction === INCREASING) ? 'tiltaget' : 'aftaget';
        let locationDesc = '';
        if (this.props.locationName !== undefined) {
            locationDesc = `i ${this.props.locationName}`
        }

        return <p>er dagen {locationDesc} {direction} med</p>
    }
}
