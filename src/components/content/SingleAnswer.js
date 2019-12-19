import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser from 'react-html-parser';
import {connect} from 'react-redux'
import jwt_decode from 'jwt-decode'

import AddComment from './AddComment'
import Comments from './Comments'
import ProfileImage from '../../assets/icons/boy.svg'
import UpvoteBtn from '../buttons/Upvote';
import DownvoteBtn from '../buttons/Downvote';
import { SuccessIconAnswer, ThreeDotsIcon } from '../icons';
import MarkBestBtn from '../buttons/MarkBest';
import AnswerDropdown from '../dropdowns/answerDropdown';

class SingleAnswer extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayPostDropdown: false,
            displayCommentBox: true,
            answerUpvoted: false,
            answerDownvoted: false,
            ...this.props.data
        }

        this.displayPostDropdown = this.displayPostDropdown.bind(this);
    }

    displayPostDropdown(){
        this.setState({
            displayPostDropdown: !this.state.displayPostDropdown
        })
    }

    // updateData(type){
    //     if(type === 'downvote') {
    //         this.setState({answerDownvoted: true})
    //     } else {
    //         this.setState({answerUpvoted: true})
    //     }
    // }

    render(){
        
        let currentUser = {};
        if (localStorage.getItem('user_token')) {
            currentUser = jwt_decode(localStorage.getItem('user_token'));
        }

        const {questionOwner, questionId} = this.props;
        
        const {body, comments, date, downvotes, question, upvotes, user, _id} = this.props.data.answer;
        
        
        return (
            <div className="main-content-item">
                <div className="top-actions">
                    <button className="top-action-btn" onClick={() => this.displayPostDropdown()}>
                        <ThreeDotsIcon />
                    </button>
                    {this.state.displayPostDropdown && <AnswerDropdown user={user._id} id={_id} updateData={this.props.updateData} deleteAnswer={this.props.deleteAnswer} displayPostDropdown={this.displayPostDropdown} /> }
                </div>
                <div className="user-details">
                    <div className="question-type">
                        {!(_id === this.props.bestId) && <p>Answer</p>}
                        <p className="best-answer">
                            {_id === this.props.bestId && <SuccessIconAnswer />}
                            {_id === this.props.bestId && 'Approved Answer'}
                        </p>
                    </div>
                    <div className="question-user-details">
                        <div className="question-user-image">
                            <Link to={`/user/${user._id}`}>
                                <img src={ProfileImage} alt="user avatar" />
                            </Link>
                        </div>
                        <div className="question-user-name">
                            <span>
                                <Link to={`/user/${user._id}`}>
                                    {user.name}
                                </Link>
                            </span>
                            <span>Answered {moment(date).fromNow()}</span>
                        </div>
                    </div>
                </div>
                <div className="qestion-details">
                    {
                        body && <div className="question-text">{ReactHtmlParser(draftToHtml(body))}</div>
                    }
                </div>
                <div className="bottom-actions">
                    <UpvoteBtn upvotes={upvotes} answerId={_id} updateData={this.props.updateData} />
                    <DownvoteBtn downvotes={downvotes} answerId={_id} updateData={this.props.updateData} />
                    {
                        (questionOwner === currentUser.id && _id !== this.props.bestId) && 
                        <MarkBestBtn answerId={_id} questionId={questionId} updateData={this.props.updateData} />
                    }
                </div>
                <Comments comments={comments} answerId={_id} updateData={this.props.updateData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userDetails
    }
}

export default connect(mapStateToProps, null)(SingleAnswer)