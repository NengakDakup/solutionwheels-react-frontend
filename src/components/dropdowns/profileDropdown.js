import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

    render(){
        //const className = `header-notification-drop header-profile-drop ${this.props.active && "active-display"}`;
        if(this.props.active){
            return (
                <div className="header-notification-drop header-profile-drop active-display" ref={this.container}>
                    <ul>
                        <li>
                            <Link>Ask Question</Link>
                        </li>
                        <li>
                            <Link>View Profile</Link>
                        </li>
                        <li>
                            <Link>Log Out</Link>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return null;
        }
        
    }
}

export default ProfileDropDown