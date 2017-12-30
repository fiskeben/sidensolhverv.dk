import React from 'react';
import Mapper from './Mapper';
import Sheet from './Sheet';
import Loading from './Loading';
import Cookies from './Cookies';
import Debug from './Debug';
import calculator from '../calculator';
import geolocator from '../geolocator';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.locate = this.locate.bind(this);

        const defaultCoords = { lat: 56.15176494755459, lng: 10.208444595336914 };
        let date = new Date();

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('date')) {
            date = new Date(urlParams.get('date'));
        }

        if (urlParams.has('coords')) {
            const coords = urlParams.get('coords').split(',');
            defaultCoords.lat = parseFloat(coords[0]);
            defaultCoords.lng = parseFloat(coords[1]);
        }

        this.state = {
            data: undefined,
            coords: defaultCoords,
            showHelpText: false,
            loading: false,
            date
        };
    }

    locate() {
        this.setState(Object.assign({}, this.state, { showHelpText: true, loading: true }));
            
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const detectedCoords = {latitude: pos.coords.latitude, longitude: pos.coords.longitude};
                localStorage.setItem('coords', JSON.stringify(detectedCoords));
                this.handleUpdate(detectedCoords);
            },
            (err) => {
                console.error('got error', err);
                if (err.code !== 3) {
                    localStorage.setItem('geolocationdisabled', 'yes');
                }
                this.setState(Object.assign({}, this.state, { showHelpText: true, loading: false }));
            }
        );
    }

    componentDidMount() {
        let coords = localStorage.getItem('coords');
        if (coords != undefined) {
            return this.handleUpdate(JSON.parse(coords));
        }

        const geolocationDisabled = (localStorage.getItem('geolocationdisabled') === 'yes')

        if (geolocationDisabled) {
            this.setState(Object.assign({}, this.state, { showHelpText: true, loading: false }));
        } else {
          this.locate();  
        }
    }

    handleUpdate(coords, _date) {
        const date = _date || this.state.date;
        const locationPromise = geolocator.locate(coords);
        const calculationPromise = calculator.calculate(coords.latitude, coords.longitude, date);

        Promise.all([locationPromise, calculationPromise])
        .then(
            results => {
                const locationName = results[0];
                const data = results[1];
                const newState = Object.assign({},
                    this.state,
                    {
                        date,
                        data,
                        locationName,
                        coords: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        },
                        showHelpText: false,
                        loading: false
                    }
                );
                this.setState(newState);
            },
            err => {
                const newState = Object.assign({},
                    this.state,
                    {
                        date,
                        data: undefined,
                        showHelpText: true,
                        loading: false
                    }
                );
                this.setState(newState);
                console.error('Error updating stuff', err);
            }
        )
    }

    changeDate(diff) {
        const difference = diff * 86400000;
        const timestamp = this.state.date.getTime() + difference;
        const date = new Date(timestamp)
        this.handleUpdate({ latitude: this.state.coords.lat, longitude: this.state.coords.lng }, date);
    }

    render() {
        const data = this.state.data || {};
        const showHelpText = this.state.data === undefined;

        const sheet = <Sheet
            showHelpText={showHelpText}
            date={data.date}
            since={data.since}
            locationName={this.state.locationName}
            hours={data.hours}
            minutes={data.minutes}
            difference={data.difference}
            direction={data.direction}
            solstice={data.solstice}
            coords={this.state.coords}
            locate={this.locate}
        />;
        
        return (
            <div className='main'>
                <Mapper clickInMap={this.handleUpdate} coords={this.state.coords} />
                {sheet}
                <Loading visible={this.state.loading}/>
                <Cookies/>
                <Debug update={this.changeDate} />
            </div>
        )
    }
}