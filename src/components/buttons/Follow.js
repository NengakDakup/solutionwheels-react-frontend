import React, { Component } from 'react'
import { FollowIcon } from '../icons';


class FollowBtn extends Component {
    sharePost(){
        alert('share post');
    }
    render(){
        return (
            <button className="follow-btn">
                <FollowIcon />
                <span className="follow-text">Follow</span> 
                <span className="follow-count">{56}</span>
            </button>
        )
    }
}

export default FollowBtn;