import React from 'react';

export default class TimeSheet extends React.Component {
    render() {
        let hours = '';
        let hourUnits = '';
        if (this.props.hours === 1) {
            hours = '1';
            hourUnits = 'time';
        } else {
            hours = `${this.props.hours}`;
            hourUnits = 'timer';
        }

        let minutes = '';
        let minuteUnits = '';
        if (this.props.minutes === 1) {
            minutes = '1';
            minuteUnits = 'minut';
        } else {
            minutes = `${this.props.minutes}`;
            minuteUnits = 'minutter';
        }

        let binder = '';
        if (this.props.hours > 0 && this.props.minutes > 0) {
            binder = 'og';
        }

        if (this.props.hours === 0 && this.props.minutes > 0) {
            hours = '';
            hourUnits = '';
            binder = '';
        } else if (this.props.hours > 0 && this.props.minutes === 0) {
            minutes = '';
            minuteUnits = '';
            binder = '';
        }
        
        return <div className='times'>
                    <p>
                        <span className='hours'>{hours}</span> {hourUnits} <span className='binder'>{binder}</span><br /> 
                        <span className='minutes'>{minutes}</span> {minuteUnits}
                    </p>
                </div>
    }
}
