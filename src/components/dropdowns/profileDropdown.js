import React, { Component } from 'react'
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
        this.props.logOut();
        //console.log(this.props)//.history.push('/login');
    }

    render(){
        //const className = `header-notification-drop header-profile-drop ${this.props.active && "active-display"}`;
        if(this.props.active){
            return (
                <div className="header-profile-drop active-display" ref={this.container}>
                    <ul>
                        <li onClick={ () => {
                            this.props.toggleDropDown('profile')
                            this.props.toggleDropDown('ask');
                        }} >
                            <a href="#">Ask Question</a>
                        </li>
                        <li>
                            <Link to="/profile">View Profile</Link>
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

