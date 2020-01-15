import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import ProfileImage from '../../../assets/icons/145841-avatar-set/png/man-2.png'

class UserCard extends Component {
    render(){
        return (
            <div className="user-of-the-week-wrap">
                <div className="user-of-week-profile-wrap">
                    <div className="user-week-image">
                        <Link to="/user/5df708d3d0d33e31c67b1651">
                            <img src={ProfileImage} alt="oijijijiojoj" />
                        </Link>
                    </div>
                    <div className="user-week-details">
                        <p className="user-week-name">
                            <Link to="/user/5df708d3d0d33e31c67b1651">
                                Dakup Nengak
                            </Link>
                        </p>
                        <div className="user-week-tags">
                            <span>100 Points</span>
                            <span>13 Questions</span>
                            <span>25 Answers</span>
                        </div>
                    </div>
                </div>
                <div className="card-title-bottom">
                    <p>User of the Week</p>
                </div>
            </div>
        )
    }
}

export default UserCard