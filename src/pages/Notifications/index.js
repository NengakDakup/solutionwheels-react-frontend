import React, {Component} from 'react'
import { connect } from 'react-redux'
import { logOut, loadQuestions } from '../../actions'
import { Link } from 'react-router-dom'
import axios from 'axios'

import server from '../../config/config'
import {markAllRead} from '../../actions'
import Meta from '../../components/header/Meta'

import Header from '../../components/header'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
import { MarkRead, RightArrow } from '../../components/icons'
import NotificationItem from '../../components/notificationItem'

class Notifications extends Component {
    constructor(props){
        super(props);
        this.markRead = this.markRead.bind(this);
    }

    markRead(){
        axios.get(server + '/api/notification/markallread')
            .then(res => {
                this.props.markAllRead();
            })
    }

    render(){
        const {data} = this.props; 
        
        return(
            <div className="body">
                <Meta 
                    title='Notifications'
                    description='Notifications'
                    image={'/test/for/now'}
                    url={`https://solutionwheels.com/notifications`}
                />
                <Header data={data} />
                {/* <WelcomeDiv /> */}
                <div className="content">
                    <LeftSide />
                    <div className="main-content">
                        <div className="header-notification-drop notification-main" >
                            <div className="header-notification-drop-top">
                                <p>
                                    All Notifications <RightArrow />
                                </p>
                                <p>
                                    <button className="mark-all-btn" onClick={() => this.markRead()}><MarkRead /> Mark All as Read</button>
                                </p>
                            </div>
                            <ul className="notification-main-ul">
                                {
                                    this.props.data.notifications.length >= 1 ? this.props.data.notifications.map(notification => {
                                        return <NotificationItem data={notification} key={notification._id} />
                                    }) : <span>Loading...</span>
                                }
                            </ul>
                        </div>
                    </div>
                    <RightSide />
                </div>
            </div>
        )
    }
}

//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        data: state 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markAllRead: (payload) => { dispatch(markAllRead(payload)) } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)