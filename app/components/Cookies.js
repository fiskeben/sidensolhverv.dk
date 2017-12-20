import React from 'react';

export default class Cookies extends React.Component {
    constructor(props) {
        super(props);
        this.accept = this.accept.bind(this);
        const accepted = localStorage.getItem('cookieaccept');
        this.state = { accepted: (accepted != null)};
    }

    accept() {
        localStorage.setItem('cookieaccept', true);
        this.setState({ accepted: true });
    }

    render() {
        if (!this.state.accepted) {
            return <div className='cookie-warning'>
                <p>Denne side bruger cookies.
                    Ved at trykke OK accepterer du dette.</p><button onClick={this.accept}>OK</button>
            </div>
        }
        return null;
    }
}