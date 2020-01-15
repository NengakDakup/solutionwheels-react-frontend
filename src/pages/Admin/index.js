import React, {Component} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import server from '../../config/config'
import addTokenToHeader from '../../utils/addTokenToHeader'

import { AddIcon, NotificationIcon, DownArrow, MenuIcon, CloseBtn } from '../../components/icons'
import ProfileDropDown from '../../components/dropdowns/profileDropdown'
import ProfileImage from '../../assets/icons/boy.svg'
import LogoMain from '../../assets/logo-white.png'
import Overview from './Views/Overview'
import Navigation from './Components/Navigation'
import Questions from './Views/Questions'
import Messages from './Views/Messages'
import Mailing from './Views/Mailing'
import Reported from './Views/Reported'
import Settings from './Views/Settings'
import Suscribers from './Views/Suscribers'
import Users from './Views/Users'


class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            data: null,
            activeTab: 'overview',
            loading: true,
            sidebar: false
        }

        this.setActiveTab = this.setActiveTab.bind(this);
        this.toggleSideBar = this.toggleSideBar.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentWillMount(){
        addTokenToHeader(localStorage.getItem('user_token'));
        try {
            const user = jwt_decode(localStorage.getItem('user_token'));
            this.setState({user: user})
            if (user.status !== 7 ) throw Error;
        } catch {
            window.stop();
            alert('Please Login As Admin');
            window.location.href = '/login';
        }
        axios.get(server + '/api/admin/overview')
            .then(res => {
                this.setState({
                    data: res.data,
                    loading: false
                })
            }).catch(err => {
                window.stop();
                alert('Please log in as admin first');
                window.location.href = '/login';
            })
    }

    setActiveTab(tab){
        this.setState({
            activeTab: tab
        })
    }

    toggleSideBar(){
        if(this.state.sidebar){
            document.querySelector('.admin-left').classList.remove('visible')
            this.setState({sidebar: false})
        } else {
            document.querySelector('.admin-left').classList.add('visible');
            this.setState({sidebar: true})
        }
    }

    deleteUser(id){
        axios.delete(server + '/api/admin/delete/user/' + id)
            .then(res => {
                window.location.href = '/admin'
            }).catch(err => alert(err))
    }

    render(){
        const {user} = this.state;
        return (
            <div className="body admin-body">
                <div className="header admin-header">
                    <div className="header-logo">
                        <button className="toggle-btn" onClick={() => this.toggleSideBar()}>
                            {this.state.sidebar? CloseBtn('#fff') : <MenuIcon />}
                        </button>
                        <a href="/" className="header-logo-link">
                            <img src={LogoMain} alt="solution wheels" />
                        </a>
                    </div>
                    <h3 className="admin-logo">Admin Dashboard</h3>
                    <div className="header-navigation">
                        <ul className="header-nav-ul">
                            <li className="header-nav-item" >
                                <img src={ProfileImage} alt={'Dakup Nengak'} />
                                <p className="header-display-name">
                                    <span className="header-name-text">
                                        {
                                            // data.userDetails.username.slice(data.userDetails.username.lastIndexOf(' '), data.userDetails.username.length)
                                            user.name.slice(user.name.lastIndexOf(' '), user.name.length)
                                        }
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="content">
                    <Navigation activeTab={this.state.activeTab} setActiveTab={this.setActiveTab} />
                    {!this.state.loading && this.state.activeTab === 'overview' && <Overview data={this.state.data} setActiveTab={this.setActiveTab} />}
                    {!this.state.loading && this.state.activeTab === 'messages' && <Messages /> }
                    {/* {!this.state.loading && this.state.activeTab === 'mailing' && <Mailing /> } */}
                    {!this.state.loading && this.state.activeTab === 'reported' && <Reported /> }
                    {!this.state.loading && this.state.activeTab === 'settings' && <Settings /> }
                    {/* {!this.state.loading && this.state.activeTab === 'suscribers' && <Suscribers /> } */}
                    {!this.state.loading && this.state.activeTab === 'users' && <Users data={this.state.data.profiles} deleteUser={this.deleteUser} /> }
                    {!this.state.loading && this.state.activeTab === 'questions' && <Questions data={this.state.data.questions} />}
                </div>
            </div>
        )
    }
}

export default Admin