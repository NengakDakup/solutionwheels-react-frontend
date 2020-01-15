import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import {loadNotifications, markSeenNotifications} from '../../actions'
import server from '../../config/config'
import addTokenToHeader from '../../utils/addTokenToHeader'

import HeaderSearch from './headerSearch'
import NotificationDropdown from '../dropdowns/notificationDropdown'
import ProfileDropDown from '../dropdowns/profileDropdown'
import { AddIcon, NotificationIcon, DownArrow } from '../icons'
import ProfileImage from '../../assets/icons/boy.svg'
import LogoMain from '../../assets/logo-main.png'
// import DownArrow from '../../assets/icons/chevron-arrow-down.svg'
import AskQuestion from '../content/AskQuestion'
import DisplayToast from '../loaders/DisplayToast'
import BackTop from '../buttons/BackTop'
import ImageViewer from '../content/ImageViewer'
import ShareQuestion from '../dropdowns/ShareQuestion'
import NotifiableCount from '../dropdowns/NotifiableCount'
// import TopHorizontalLoader from '../../components/loaders/TopHorizontalLoader'


class Header extends Component {
    constructor(){
        super()
        this.state = {
            NotificationDropdownActive: false,
            ProfileDropDownActive: false,
            AskQuestionActive: false
        }

        this.toggleDropDown = this.toggleDropDown.bind(this)
    }

    componentWillMount(){
        addTokenToHeader(localStorage.getItem('user_token'));
        axios.get(server + '/api/notification/all')
            .then(res => {
                this.props.loadNotifications(res.data);
            }).catch(err => console.log(err))
    }

    toggleDropDown(type){
        if (type === 'notification') {
            this.setState({
                NotificationDropdownActive: !this.state.NotificationDropdownActive
            })
            if(this.props.data.notifications.filter(notification => !notification.seen).length >= 1){
                axios.get(server + '/api/notification/markseen')
                .then(res => this.props.markSeenNotifications())
            } else { return null;}
        } else if(type === 'profile') {
            this.setState({
                ProfileDropDownActive: !this.state.ProfileDropDownActive
            })
        } else if (type === 'ask') {
            this.setState({
                AskQuestionActive: !this.state.AskQuestionActive
            })
        }

    }

    render(){
        const { NotificationDropdownActive, ProfileDropDownActive } = this.state;
        const { data, history } = this.props;
        
        
        const Nav = () => {
            if(data.userDetails.loggedIn) {
                return (
                    <ul className="header-nav-ul">
                        {/* <TopHorizontalLoader /> */}
                        <li className="header-nav-item" onClick={ () => this.toggleDropDown('ask')}>
                            <AddIcon />
                        </li>
                        <li className="header-nav-item" onClick={() => {this.toggleDropDown('notification')}}>
                            <NotificationIcon />
                            <NotifiableCount />
                        </li>
                        <NotificationDropdown active={NotificationDropdownActive} toggleDropDown={this.toggleDropDown} />
                        <li className="header-nav-item" onClick={() => {this.toggleDropDown('profile')}}>
                            <img src={ProfileImage} alt={data.userDetails.username} />
                            <p className="header-display-name">
                                <span className="header-name-text">
                                    {
                                        data.userDetails.username.slice(data.userDetails.username.lastIndexOf(' '), data.userDetails.username.length)
                                    }
                                </span>
                                <span className="header-down-arrow">
                                    <DownArrow />
                                </span>
                            </p>
                        </li>
                        <ProfileDropDown history={history} active={ProfileDropDownActive} toggleDropDown={this.toggleDropDown} />
                    </ul>
                )
            } else {
                return (
                    <div className="login-signup-buttons">
                        <Link to="/login" className="login-btn">Log In</Link>
                        <Link to="/signup" className="signup-btn">Sign Up</Link>
                    </div>
                )
            }
        }
        return(
            <div className="header">
                <BackTop />
                { this.props.data.imageViewer.display && <ImageViewer /> }
                { this.props.data.shareQuestion.display && <ShareQuestion /> }
                { this.props.data.toast.display && <DisplayToast type={this.props.data.toast.type} message={this.props.data.toast.message} /> }
                { this.state.AskQuestionActive && <AskQuestion data={data} toggleDropDown={this.toggleDropDown} />}
                <div className="header-logo">
                    <Link to="/" className="header-logo-link">
                        <img src={LogoMain} alt="solution wheels" />
                    </Link>
                </div>
                <HeaderSearch />
                <div className="header-navigation">
                    <Nav />
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
        loadNotifications: (payload) => { dispatch(loadNotifications(payload)) },
        markSeenNotifications: (payload) => { dispatch(markSeenNotifications(payload)) }
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

