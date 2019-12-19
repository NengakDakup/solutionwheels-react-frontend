import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

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
                    </div>
                    <ul>
                        {this.props.data.length >= 1 ? this.props.data.map(notification => {
                            return <NotificationItem data={notification} key={notification._id} />
                        }) : <center><span>No Notifications</span></center>}
                        
                    </ul>
                </div>
            )
        } else {
            return null;
        }
        //const className = `header-notification-drop ${this.props.active && "active-display"}`;
        
    }
}

//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        data: state.notifications
    }
}
  
export default connect(mapStateToProps, null)(NotificationDropdown);