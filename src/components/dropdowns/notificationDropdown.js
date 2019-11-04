import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NotificationItem from '../notificationItem'

import { RightArrow, MarkRead } from '../icons'

class NotificationDropdown extends Component {

    container = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        
    }
    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
      
    }

    handleClickOutside = (event) => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.props.toggleDropDown('notification')
          }
    }
    

    render(){
        if(this.props.active){
            return (
                <div className="header-notification-drop active-display" ref={this.container}>
                    <div className="header-notification-drop-top">
                        <p>
                            <Link to="/notifications">See All Notifications <RightArrow /> </Link>
                        </p>
                        <p>
                            <Link to="/"><MarkRead /> Mark All as Read</Link>
                        </p>
                    </div>
                    <ul>
                        <NotificationItem />
                        <NotificationItem />
                        <NotificationItem />
                        <NotificationItem />
                    </ul>
                </div>
            )
        } else {
            return null;
        }
        //const className = `header-notification-drop ${this.props.active && "active-display"}`;
        
    }
}

export default NotificationDropdown