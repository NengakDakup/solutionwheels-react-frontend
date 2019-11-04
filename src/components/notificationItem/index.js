import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from '../../assets/icons/boy.svg'

class NotificationItem extends Component {
    render(){
        const read = "read-notification-item";
        return (
            <li className="notification-item">
                <Link to="/">
                    <div className="notification-item-left">
                        <img src={ProfileImage} alt="user avatar" />
                    </div>
                    <div className="notification-item-right">
                        <p className="notification-item-time">20 Minutes Ago</p>
                        <p className="notification-item-title">John Dee Answered Your Question</p>
                        <p className="notification-item-brief">Basically what you need is a little more space so as to achieve/fulfill your goals. stay away from distractions and friends that tend to push you...</p>
                    </div>
                </Link>
            </li>
        )
    }
}

export default NotificationItem