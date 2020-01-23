import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../actions'

class ProfileDropDown extends Component {

    container = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);

    }
    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);

    }

    handleClickOutside = (event) => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.props.toggleDropDown('profile')
          }
    }

    logOut = () => {
        localStorage.removeItem('user_token');
        delete axios.defaults.headers.common['Authorization'];
        this.props.logOut();
        try {
            this.props.history.push('/login');   
        } catch (error) {
            window.location.href = '/login';
        }
    }

    render(){
        //const className = `header-notification-drop header-profile-drop ${this.props.active && "active-display"}`;
        if(this.props.active){
            return (
                <div className="header-profile-drop active-display" ref={this.container}>
                    <ul>
                        <li>
                            <a href="">Dakup Nengak</a>
                        </li>
                        <li onClick={ () => {
                            this.props.toggleDropDown('profile')
                            this.props.toggleDropDown('ask');
                        }} >
                            <a href="#">Ask Question</a>
                        </li>
                        <li>
                            <Link to="/profile">View Profile</Link>
                        </li>
                        <li>
                            <a>Profile Settings</a>
                        </li>
                        <li onClick={ () => this.logOut()}>
                            <a href="#">Log Out</a>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return null;
        }

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => { dispatch(logOut(null)) },
    }
}

export default connect(null, mapDispatchToProps)(ProfileDropDown)

