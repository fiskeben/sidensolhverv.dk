import React from 'react';
import {GoogleMap, Marker, OverlayView} from 'react-google-maps';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = { coords: props.coords, clickInMap: props.clickInMap };
        this.handleMapClick = this.handleMapClick.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({ coords: props.coords });
    }

    handleMapClick(data) {
        const latitude = data.latLng.lat();
        const longitude = data.latLng.lng();
        this.state.clickInMap({latitude, longitude});
    }

    render() {
        console.log('render map', this.state);
        return (
            <GoogleMap
                defaultZoom={11}
                defaultCenter={this.state.coords}
                center={this.state.coords}
                onClick={this.handleMapClick}>
                <Marker position={this.state.coords}></Marker>
            </GoogleMap>
        );
    }
};
