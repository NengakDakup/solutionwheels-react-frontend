import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import HeaderSearch from './headerSearch'
import NotificationDropdown from '../dropdowns/notificationDropdown'
import ProfileDropDown from '../dropdowns/profileDropdown'
import { AddIcon, NotificationIcon } from '../icons'
import ProfileImage from '../../assets/icons/boy.svg'
import DownArrow from '../../assets/icons/chevron-arrow-down.svg'

class Header extends Component {
    constructor(){
        super()
        this.state = {
            NotificationDropdownActive: false,
            ProfileDropDownActive: false,
        }

        this.toggleDropDown = this.toggleDropDown.bind(this)
    }

    toggleDropDown(type){
        if (type === 'notification') {
            this.setState({
                NotificationDropdownActive: !this.state.NotificationDropdownActive
            })
        } else {
            this.setState({
                ProfileDropDownActive: !this.state.ProfileDropDownActive
            })
        }
        
    }

    render(){
        const { NotificationDropdownActive, ProfileDropDownActive } = this.state;
        const nav = () => {
            if(this.props.data.userDetails.loggedIn) {
                return (
                    <ul className="header-nav-ul">
                        <li className="header-nav-item">
                            <AddIcon />
                        </li>
                        <li className="header-nav-item" onClick={() => {this.toggleDropDown('notification')}}>
                            <NotificationIcon />
                            <div className="notifiable-count">
                                <p>35</p>
                            </div>
                        </li>
                        <NotificationDropdown active={NotificationDropdownActive} />
                        <li className="header-nav-item" onClick={() => {this.toggleDropDown('profile')}}>
                            <img src={ProfileImage} alt="users profile" />
                            <p className="header-display-name">Dakup 
                                <span>
                                    <img src={DownArrow} alt="down arrow" className="header-down-arrow"/>
                                </span>
                            </p>
                        </li>
                        <ProfileDropDown active={ProfileDropDownActive} />
                    </ul>
                )
            } else {
                return (
                    <div>
                        <button>Log In</button>
                        <button>Sign Up</button>
                    </div>
                )
            }
        }
        return(
            <div className="header">
                <div className="header-logo">
                    <Link to="/" className="header-logo-link">
                        SOLUTION WHEELS
                    </Link>
                </div>
                <div className="header-search">
                    <HeaderSearch />
                </div>
                <div className="header-navigation">
                    { nav() }
                </div>
            </div>
        )
    }
}

export default Header