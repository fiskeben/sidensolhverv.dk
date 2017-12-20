import React from 'react';
import { INCREASING, DECREASING } from '../calculator';
import dateformatter from '../dateformatter';

export default class Location extends React.Component {
    render() {
        const direction = (this.props.direction === INCREASING) ? 'tiltaget' : 'aftaget';
        let locationDesc = '';
        if (this.props.locationName !== undefined) {
            locationDesc = `i ${this.props.locationName}`
        }
        const date = dateformatter.format(this.props.date);

        return <p>{date} er dagen {locationDesc} {direction} med</p>
    }
}
