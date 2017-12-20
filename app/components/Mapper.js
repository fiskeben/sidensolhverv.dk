import Map from './Map'
import React from 'react';
import { compose, withProps } from 'recompose';
import {withScriptjs, withGoogleMap} from 'react-google-maps';

export default compose(
    withProps(
        {
            googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div className='loading' />,
            containerElement: <div className='map-container' />,
            mapElement: <div className='map-element' />
        }
    ),
    withScriptjs,
    withGoogleMap
)((props) => {
    return <Map coords={props.coords} clickInMap={props.clickInMap} />
});
