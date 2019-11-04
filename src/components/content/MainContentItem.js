import React, { Component } from 'react'

import ProfileImage from '../../assets/icons/boy.svg'
import { AnswerIcon, LikeIcon, ShareIcon } from '../icons'

class MainContentItem extends Component {
    render(){
        return (
            <div className="main-content-item">
                <div className="user-details">
                    <div className="question-type">
                        <p>Question  .  Programming</p>
                    </div>
                    <div className="question-title">
                        <span>Should I give up my dream to become a software developer after failing my 10 technical interviews?</span>
                    </div>
                    <div className="question-user-details">
                        <div className="question-user-image">
                            <img src={ProfileImage} alt="user avatar" />
                        </div>
                        <div className="question-user-name">
                            <span>Dakup Nengak</span>
                            <span>Asked 20mins Ago</span>
                        </div>
                    </div>
                </div>
                <div className="qestion-details">
                    <div className="question-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae velit omnis sed labore, est inventore qui eos, numquam aliquid expedita quas et harum quod beatae voluptate corporis aspernatur excepturi rerum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae velit omnis sed labore, est inventore qui eos, numquam aliquid expedita quas et harum quod beatae voluptate corporis aspernatur excepturi rerum?
                    </div>
                    <div className="question-stats">
                        <span>In Progress</span>
                        <span>12 Answers</span>
                    </div>
                </div>
                <div className="bottom-actions">
                    <div className="bottom-actions-answer">
                        <span><AnswerIcon /> Answer</span>
                    </div>
                    <div className="bottom-actions-like">
                        <span><LikeIcon /> Like</span>
                    </div>
                    <div className="bottom-actions-share">
                        <span><ShareIcon /> Share</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainContentItem