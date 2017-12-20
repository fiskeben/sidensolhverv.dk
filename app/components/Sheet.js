import React from 'react';
import Location from './Location';
import TimeSheet from './TimeSheet';
import Difference from './Difference';
import SharableLink from './SharableLink';

export default class Sheet extends React.Component {
    render() {
        let classnames = 'sheet';
        let components;

        if (!this.props.showHelpText) {
            components = <div>
                <Location date={this.props.date} direction={this.props.direction} locationName={this.props.locationName} />
                <TimeSheet hours={this.props.hours} minutes={this.props.minutes} />    
                <Difference difference={this.props.difference} direction={this.props.direction} />    
                <SharableLink date={this.props.date} lat={this.props.coords.lat} lng={this.props.coords.lng} />
            </div>
        } else {
            components = <div>
                <p>Lad maskinen finde din placering og beregne hvor meget dagen er blevet kortere eller længere.</p>
                <p>Ellers kan du gøre beregningen for et sted ved at trykke på kortet.</p>
            </div>
        }
        
        return (
            <div id='sheet' className={classnames}>
                <h1>Hvor meget er dagen tiltaget?</h1>
                {components}
            </div>
        );
    }
}