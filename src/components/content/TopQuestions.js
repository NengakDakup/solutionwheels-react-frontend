import React, { Component } from 'react'
import ProfileImage from '../../assets/icons/145841-avatar-set/png/man-2.png'

import { Link } from 'react-router-dom'

class TopQuestions extends Component {

    
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
                        <p className="user-week-name">
                            <Link to="/question/how-to-boss">
                                How To be a boss at what you do?
                            </Link>
                        </p>
                        <p className="user-week-name">
                            <Link to="/question/how-to-boss">
                                How To be a boss at what you do?
                            </Link>
                        </p>
                        <p className="user-week-name">
                            <Link to="/question/how-to-boss">
                                How To be a boss at what you do?
                            </Link>
                        </p>
                        
                    </div>
                </div>
                <div className="card-title-bottom">
                    <p>Top Questions</p>
                </div>
            </div>
        )
    }
}

export default TopQuestions