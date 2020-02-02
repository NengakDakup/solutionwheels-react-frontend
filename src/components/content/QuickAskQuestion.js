import React, { component, Component } from 'react'

import image from '../../assets/icons/boy.svg';

class QuickAskQuestion extends Component {
    render(){
        return (
            <div className="main-content-item quick-ask">
                <p>
                    <img src={image} />
                    <span>Dakup Nengak</span>
                </p>
                <p>Whats your Question today?</p>
            </div>
        )
    }
}

export default QuickAskQuestion