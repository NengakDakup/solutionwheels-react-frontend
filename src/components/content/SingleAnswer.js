import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import ProfileImage from '../../assets/icons/boy.svg'
import { AnswerIcon, LikeIcon, ShareIcon, ProgressIcon, AnsweredIcon } from '../icons'
import LikeBtn from '../buttons/Like'
import AnswerBtn from '../buttons/Answer'
import ShareBtn from '../buttons/Share'

class SingleAnswer extends Component {
    render(){
        const {data} = this.props;
        return (
            <div className="main-content-item">
                <div className="user-details">
                    <div className="question-type">
                        <p>Answer</p>
                    </div>
                    <div className="question-user-details">
                        <div className="question-user-image">
                            <Link to={`/user/${data.user._id}`}>
                                <img src={ProfileImage} alt="user avatar" />
                            </Link>
                        </div>
                        <div className="question-user-name">
                            <span>
                                <Link to={`/user/${data.user._id}`}>
                                    {data.user.name}
                                </Link>
                            </span>
                            <span>Answered {data.date}</span>
                        </div>
                    </div>
                </div>
                <div className="qestion-details">
                    {
                        data.body && <div className="question-text">{data.body}</div>
                    }
                </div>
                <div className="bottom-actions">
                    <AnswerBtn addAnswer={this.addAnswer} />
                    <LikeBtn likes={data.likes} ques_id={data._id} />
                    <ShareBtn data={data} />
                </div>
                {/* { this.state.displayAnswerBox && <AddAnswer /> } */}
                {/* {displayComments && <Answers /> } */}
            </div>
        )
    }
}

export default SingleAnswer