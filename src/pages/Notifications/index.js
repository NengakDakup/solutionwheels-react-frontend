import React, {Component} from 'react'
import { connect } from 'react-redux'
import { logOut, loadQuestions } from '../../actions'
import { Link } from 'react-router-dom'

import Header from '../../components/header'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
import { MarkRead, RightArrow } from '../../components/icons'
import NotificationMainItem from '../../components/notificationItem/NotificationMainItem'

class Notifications extends Component {

    logOut = () => {
        this.props.logOut();
    }

    loadQuestions = (payload) => {
        this.props.loadQuestions(payload);
    }

    render(){
        const {data} = this.props; 
        
        return(
            <div className="body">
                <Header data={data} />
                {/* <WelcomeDiv /> */}
                <div className="content">
                    <LeftSide />
                    <div className="main-content">
                        <div className="header-notification-drop notification-main" >
                            <div className="header-notification-drop-top">
                                <p>
                                    <Link to="/notifications">All Notifications <RightArrow /></Link>
                                </p>
                                <p>
                                    <Link to="/notifications"><MarkRead /> Mark All as Read</Link>
                                </p>
                            </div>
                            <ul className="notification-main-ul">
                                <NotificationMainItem />
                                <NotificationMainItem />
                                <NotificationMainItem />
                                <NotificationMainItem />
                                <NotificationMainItem />
                                <NotificationMainItem />
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
        logOut: () => { dispatch(logOut(null)) },
        loadQuestions: (payload) => { dispatch(loadQuestions(payload)) } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)