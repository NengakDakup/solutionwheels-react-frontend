import React, { component, Component } from 'react'

import image from '../../assets/icons/boy.svg';

class QuickAskQuestion extends Component {
    render(){
        const {username} = this.props.userDetails;
        return (
            <div className="main-content-item quick-ask" onClick={() => this.props.askQuestion()}>
                <p>
                    <img src={image} />
                    <span>{username}</span>
                </p>
                <p onClick={() => this.props.askQuestion()}>Whats your Question today?</p>
            </div>
        )
    }
}

export default QuickAskQuestion