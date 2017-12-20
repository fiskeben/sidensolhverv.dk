import React from 'react';

export default class ShareDialog extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.state = { visible: props.visible === true };
    }

    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible === true });
    }

    close() {
        this.setState({ visible: false });
    }

    render() {
        console.log('modal', this.state);
        if (this.state.visible) {
            return <div className='modal'>
                <div className='dialog'>
                    <p>Kopier og del dette link:</p>
                    <input type='text' value={this.props.url} onFocus={(e) => e.target.select() } readOnly={true} />
                    <div className='right-align-button'>
                        <button onClick={this.close}>Luk</button>
                    </div>
                </div>
            </div>
        }
        return null;
    }
}