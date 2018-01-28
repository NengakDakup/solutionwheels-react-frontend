import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AddAnswer from './AddAnswer'
import Comments from './Comments'
import Answers from './Answers'

import ProfileImage from '../../assets/icons/boy.svg'
import { AnswerIcon, LikeIcon, ShareIcon, ProgressIcon, AnsweredIcon } from '../icons'


class MainContentItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            displayAnswerBox: false 
        }

        this.addAnswer = this.addAnswer.bind(this)
        this.likePost = this.likePost.bind(this)
        this.sharePost = this.sharePost.bind(this)
    }

    componentDidMount(){
        this.setState({
            displayAnswerBox: false
        })
    }

    addAnswer(){
        this.setState({
            displayAnswerBox: !this.state.displayAnswerBox
        })
    }

    likePost(id){
        alert(`LIKE_POST ${id}`);
    }

    sharePost(id){
        alert(`SHARE_POST_ID ${id}`);
    }

    render(){
        const { data, displayComments } = this.props;
        return (
            <div className="main-content-item">
                <div className="user-details">
                    <div className="question-type">
                        <p>Question  .  <Link to={`/category/${data.category_id}`}>{data.category_id}</Link></p>
                    </div>
                    <div className="question-title">
                        <span>
                            <Link to={`/item/${data.title}`}>
                                {data.title}
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
                                    {data.user_id}
                                </Link>
                            </span>
                            <span>{data.created_at}</span>
                        </div>
                    </div>
                </div>
                <div className="qestion-details">
                    {
                        data.body && <div className="question-text">{data.body}</div>
                    }
                    <div className="question-stats">
                        <span className={data.best_answer_id? 'answered-question' : 'in-progress'}>
                            {data.best_answer_id ? <span><AnsweredIcon /> Solved</span> : <span><ProgressIcon /> In Progress</span>}
                            
                        </span>
                        <span>.</span>
                        <span className="answer-count">
                            <Link>
                                {data.no_of_answers} {data.no_of_answers >= 2 ? 'Answers' : 'Answer'}
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="bottom-actions">
                    <div className="bottom-actions-answer" onClick={() => this.addAnswer()}>
                        <span><AnswerIcon /> Answer </span>
                    </div>
                    <div className="bottom-actions-like" onClick={() => this.likePost(data.id)}>
                        <span><LikeIcon /> Like . <span> {data.likes}</span></span>
                    </div>
                    <div className="bottom-actions-share" onClick={() => this.sharePost(data.id)}>
                        <span><ShareIcon /> Share</span>
                    </div>
                </div>
                { this.state.displayAnswerBox && <AddAnswer /> }
                {displayComments && <Comments /> }
                {displayComments && <Answers /> }
            </div>
        )
    }
}

export default MainContentItem