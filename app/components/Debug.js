import React from 'react';

export default class Debug extends React.Component {
    constructor(props) {
        super(props);
        this.changeDay = props.update;
        this.state = { enabled: localStorage.getItem('debugmode') === 'on' };
    }

    render() {
        if (this.state.enabled) {
            return (
                <div className='debugger'>
                    <div>
                        <button onClick={() => { this.changeDay(-10) }}>-10 dage</button>
                        <button onClick={() => { this.changeDay(-1) }}>-1 dag</button>
                        <button onClick={() => { this.changeDay(1) }}>+1 dag</button>
                        <button onClick={() => { this.changeDay(10) }}>+10 dage</button>
                    </div>
                </div>
            )
        }
        return null;
    }
}