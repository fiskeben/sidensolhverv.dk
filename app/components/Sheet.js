import React from 'react';
import Location from './Location';
import TimeSheet from './TimeSheet';
import Difference from './Difference';
import SharableLink from './SharableLink';
import LocateButton from './LocateButton';
import dateformatter from '../dateformatter';

export default class Sheet extends React.Component {
    render() {
        let classnames = 'sheet';
        let components;
        const date = (this.props.date) ? dateformatter.format(this.props.date) : 'Hvor meget er dagen tiltaget?';

        if (!this.props.showHelpText) {
            components = <div>
                <Location direction={this.props.direction} locationName={this.props.locationName} />
                <TimeSheet hours={this.props.hours} minutes={this.props.minutes} />
                <Difference difference={this.props.difference} direction={this.props.direction} />
                <div className='actions'>
                    <SharableLink date={this.props.date} lat={this.props.coords.lat} lng={this.props.coords.lng} />
                    <LocateButton locate={this.props.locate}/>
                </div>
            </div>
        } else {
            components = <div>
                <p>Lad maskinen finde din placering og beregne hvor meget dagen er blevet kortere eller længere.</p>
                <p>Ellers kan du gøre beregningen for et sted ved at trykke på kortet.</p>
                <LocateButton locate={this.props.locate}/>
            </div>
        }
        
        return (
            <div id='sheet' className={classnames}>
                <h1>{date}</h1>
                {components}
            </div>
        );
    }
}