import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import HeaderSearch from './headerSearch'
import NotificationDropdown from '../dropdowns/notificationDropdown'
import ProfileDropDown from '../dropdowns/profileDropdown'
import { AddIcon, NotificationIcon } from '../icons'
import ProfileImage from '../../assets/icons/boy.svg'
import LogoMain from '../../assets/logo-main.png'
import DownArrow from '../../assets/icons/chevron-arrow-down.svg'
import AskQuestion from '../content/AskQuestion'
import DisplayStatus from '../loaders/DisplayStatus'

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

    toggleDropDown(type){
        if (type === 'notification') {
            this.setState({
                NotificationDropdownActive: !this.state.NotificationDropdownActive
            })
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
        const { data } = this.props;
        const Nav = () => {
            if(data.userDetails.loggedIn) {
                return (
                    <ul className="header-nav-ul">
                        <li className="header-nav-item" onClick={ () => this.toggleDropDown('ask')}>
                            <AddIcon />
                        </li>
                        <li className="header-nav-item" onClick={() => {this.toggleDropDown('notification')}}>
                            <NotificationIcon />
                            <div className="notifiable-count">
                                <p>35</p>
                            </div>
                        </li>
                        <NotificationDropdown active={NotificationDropdownActive} toggleDropDown={this.toggleDropDown} />
                        <li className="header-nav-item" onClick={() => {this.toggleDropDown('profile')}}>
                            <img src={ProfileImage} alt="users profile" />
                            <p className="header-display-name">
                                { 
                                    data.userDetails.username.slice(data.userDetails.username.lastIndexOf(' '), data.userDetails.username.length)
                                } 
                                <span>
                                    <img src={DownArrow} alt="down arrow" className="header-down-arrow"/>
                                </span>
                            </p>
                        </li>
                        <ProfileDropDown active={ProfileDropDownActive} toggleDropDown={this.toggleDropDown} />
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
                <DisplayStatus />
                { this.state.AskQuestionActive && <AskQuestion toggleDropDown={this.toggleDropDown} />}
                <div className="header-logo">
                    <a href="/" className="header-logo-link">
                        <img src={LogoMain} alt="solution wheels" />
                    </a>
                </div>
                <HeaderSearch />
                <div className="header-navigation">
                    <Nav />
                </div>
            </div>
        )
    }
}

export default Header