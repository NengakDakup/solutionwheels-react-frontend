import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AddAnswer from './AddAnswer'
import Answers from './Answers'

import ProfileImage from '../../assets/icons/boy.svg'
import { AnswerIcon, LikeIcon, ShareIcon, ProgressIcon, AnsweredIcon } from '../icons'
import LikeBtn from '../buttons/Like'
import AnswerBtn from '../buttons/Answer'
import ShareBtn from '../buttons/Share'


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
                        <p>Question  .  <Link to={`/category/${data.category}`}>{data.category}</Link></p>
                    </div>
                    <div className="question-title">
                        <span>
                            <Link to={`/question/${data.slug}`}>
                                {data.question_title}
                            </Link>
                        </span>
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
                            <span>{data.date}</span>
                        </div>
                    </div>
                </div>
                <div className="qestion-details">
                    {
                        data.body && <div className="question-text">{data.body}</div>
                    }
                    <div className="question-stats">
                        <span className={data.best_answer? 'answered-question' : 'in-progress'}>
                            {data.best_answer ? <span><AnsweredIcon /> Solved</span> : <span><ProgressIcon /> In Progress</span>}
                            
                        </span>
                        <span>.</span>
                        <span className="answer-count">
                            <Link>
                                {data.answers.length === 0? 'No' : data.answers.length} {data.answers.length >= 2 ? 'Answers' : 'Answer'}
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="bottom-actions">
                    <AnswerBtn addAnswer={this.addAnswer} />
                    <LikeBtn likes={data.likes} ques_id={data._id} />
                    <ShareBtn data={data} />
                </div>
                { this.state.displayAnswerBox && <AddAnswer /> }
                {displayComments && <Answers /> }
            </div>
        )
    }
}

export default MainContentItem