import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProfileDropDown extends Component {

    render(){
        const className = `header-notification-drop header-profile-drop ${this.props.active && "active-display"}`;
        return (
            <div className={className}>
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
    }
}

export default ProfileDropDown