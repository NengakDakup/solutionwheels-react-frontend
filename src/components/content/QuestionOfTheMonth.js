import React, { Component } from 'react'
import ProfileImage from '../../assets/icons/145841-avatar-set/png/man-2.png'

import { Link } from 'react-router-dom'

class QuestionOfTheWeek extends Component {

    
    render(){
        return (
            <div className="user-of-the-week-wrap">
                <div className="user-of-week-profile-wrap">
                    <div className="user-week-details">
                        <p className="user-week-name">
                            <Link to="/question/how-to-boss">
                                How To be a boss at what you do?
                            </Link>
                        </p>
                        <div className="user-week-tags">
                            <span>24 Likes</span>
                            <span>13 Answers</span>
                            <span>Dakup Nengak</span>
                        </div>
                    </div>
                </div>
                <div className="card-title-bottom">
                    <p>Question of the Week</p>
                </div>
            </div>
        )
    }
}

export default QuestionOfTheWeek