import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

import addTokenToHeader from '../../utils/addTokenToHeader'

import HeaderSearch from './headerSearch'
import NotificationDropdown from '../dropdowns/notificationDropdown'
import ProfileDropDown from '../dropdowns/profileDropdown'
import { AddIcon, NotificationIcon } from '../icons'
import ProfileImage from '../../assets/icons/boy.svg'
import LogoMain from '../../assets/logo-main.png'
import DownArrow from '../../assets/icons/chevron-arrow-down.svg'
import AskQuestion from '../content/AskQuestion'
import DisplayToast from '../loaders/DisplayToast'
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
                        {/* <TopHorizontalLoader /> */}
                        <li className="header-nav-item" onClick={ () => this.toggleDropDown('ask')}>
                            <AddIcon />
                        </li>
                        <li className="header-nav-item" onClick={() => {this.toggleDropDown('notification')}}>
                            <NotificationIcon />
                            <div className="notifiable-count"></div>
                        </li>
                        <NotificationDropdown active={NotificationDropdownActive} toggleDropDown={this.toggleDropDown} />
                        <li className="header-nav-item" onClick={() => {this.toggleDropDown('profile')}}>
                            <img src={ProfileImage} alt={data.userDetails.username} />
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
                { this.props.data.toast.display && <DisplayToast type={this.props.data.toast.type} message={this.props.data.toast.message} /> }
                { this.state.AskQuestionActive && <AskQuestion data={data} toggleDropDown={this.toggleDropDown} />}
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

//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        data: state
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         likeQuestion: (payload) => { dispatch(likeQuestion(payload)) },
//         displayToast: (payload) => { dispatch(displayToast(payload)) }
//     }
// }

export default connect(mapStateToProps, null)(Header);

