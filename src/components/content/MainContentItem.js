import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AddAnswer from './AddAnswer'

import ProfileImage from '../../assets/icons/boy.svg'
import { ErrorIconAnswer, SuccessIconAnswer, ThreeDotsIcon } from '../icons'
import LikeBtn from '../buttons/Like'
import AnswerBtn from '../buttons/Answer'
import ShareBtn from '../buttons/Share'
import PostDropdown from '../dropdowns/postDropdown'
import ZoomableImage from './ZoomableImage'


class MainContentItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            displayAnswerBox: false,
            displayPostDropdown: false
        }

        this.addAnswer = this.addAnswer.bind(this)
        this.sharePost = this.sharePost.bind(this)
        this.displayPostDropdown = this.displayPostDropdown.bind(this)
    }

    addAnswer(){
        this.setState({
            displayAnswerBox: !this.state.displayAnswerBox
        })
    }

    sharePost(id){
        //navigator share or modal 
        alert(`SHARE_POST_ID ${id}`);
    }

    displayPostDropdown(){
        this.setState({
            displayPostDropdown: !this.state.displayPostDropdown
        })
    }

    render(){
        const { data } = this.props;
        
        return (
            <div className="main-content-item">
                <div className="top-actions">
                    <button className="top-action-btn" onClick={() => this.displayPostDropdown()}>
                        <ThreeDotsIcon />
                    </button>
                    {this.state.displayPostDropdown && <PostDropdown user={data.user._id} id={data._id} displayPostDropdown={this.displayPostDropdown} /> }
                </div>
                <div className="user-details">
                    <div className="question-type">
                        <p>Question  .  <Link to={`/category/${data.category_id}`}>{data.category_id}</Link></p>
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
                            <span>{moment(data.date).fromNow()}</span>
                        </div>
                    </div>
                </div>
                {
                    (data.image && data.image !== 'null')  && 

                    <div className="question-image">
                        <ZoomableImage src={data.image} alt={data.question_title} />
                    </div>
                }
                <div className="qestion-details">
                    {
                        data.body && <div className="question-text">{data.body}</div>
                    }
                    <div className="question-stats">
                        <span className={data.best_answer? 'answered-question' : 'in-progress'}>
                            {data.best_answer ? <span><SuccessIconAnswer /> Solved</span> : <span><ErrorIconAnswer /> In Progress</span>}
                            
                        </span>
                        <span className="dot-seperator">.</span>
                        <span className="answer-count">
                            {data.answers.length === 0? 'No' : data.answers.length} {data.answers.length >= 2 ? 'Answers' : 'Answer'}
                        </span>
                    </div>
                </div>
                <div className="bottom-actions">
                    <AnswerBtn addAnswer={this.addAnswer} />
                    <LikeBtn likes={data.likes} ques_id={data._id} />
                    <ShareBtn data={data} />
                </div>
                { this.state.displayAnswerBox && <AddAnswer addAnswer={this.addAnswer} ques_id={data._id} /> }
            </div>
        )
    }
}

export default MainContentItem