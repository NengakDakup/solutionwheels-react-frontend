import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ProfileImage from '../../assets/icons/boy.svg'
import { ProgressIcon } from '../icons'


class SearchContentItem extends Component {
    render(){
        return (
            <div className="main-content-item">
                <div className="user-details">
                    <div className="question-type">
                        <p>Question  .  <Link>Programming</Link></p>
                    </div>
                    <div className="question-title">
                        <span>
                            <Link>
                                Should I give up my dream to become a software developer after failing my 10 technical interviews?
                            </Link>
                        </span>
                    </div>
                    <div className="question-user-details">
                        <div className="question-user-image">
                            <Link>
                                <img src={ProfileImage} alt="user avatar" />
                            </Link>
                        </div>
                        <div className="question-user-name">
                            <span>
                                <Link>
                                    Dakup Nengak
                                </Link>
                            </span>
                            <span>Asked 20mins Ago</span>
                        </div>
                    </div>
                </div>
                <div className="qestion-details">
                    <div className="question-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae velit omnis sed labore, est inventore qui eos, numquam aliquid expedita quas et harum quod beatae voluptate corporis aspernatur excepturi rerum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae velit omnis sed labore, est inventore qui eos, numquam aliquid expedita quas et harum quod beatae voluptate corporis aspernatur excepturi rerum?
                    </div>
                    <div className="question-stats">
                        <span className="in-progress"><ProgressIcon /> In Progress</span>
                        <span>.</span>
                        <span className="answer-count">
                            <Link>
                                12 Answers
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchContentItem