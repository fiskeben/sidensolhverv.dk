import React from 'react';

export default class Difference extends React.Component {
    render() {
        let moreOrLess = 'længere end';
        if (this.props.difference === 0) {
            moreOrLess = 'det samme som';
        } else if (this.props.direction === 'decreasing') {
            moreOrLess = 'kortere end';
        }

        let diffMinutes = '';
        if (this.props.difference === 0) {
            diffMinutes = '';
        } else if (Math.abs(Math.ceil(this.props.difference)) === 1) {
            diffMinutes = '1 minut';
        } else {
            const differenceInMinutes = Math.abs(Math.ceil(this.props.difference));
            diffMinutes = `${differenceInMinutes} minutter`;
        }

        return <p>Det er {diffMinutes} {moreOrLess} i går.</p>
    }
}
