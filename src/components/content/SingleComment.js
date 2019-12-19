import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'

import { DeleteIcon } from '../icons';
import server from '../../config/config'

class SingleComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            deleting: false
        }

        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteComment(){
        this.setState({deleting: true})
        axios.post(server + '/api/answer/comment/delete', {
            answer_id: this.props.answerId,
            comment_id: this.props.comment._id
        }).then(res => {
            this.setState({deleting: false})
            this.props.updateData(res.data);
            console.log(res.data)
        }).catch(err => {
            this.setState({deleting: false})
            console.log(err)
        })
    }

    render(){
        let currentUser = {};
        if (localStorage.getItem('user_token')) {
            currentUser = jwt_decode(localStorage.getItem('user_token'));
        }
        const {avatar, body, date, user} = this.props.comment;
        
        return (
            <div className="single-comment">
                <p>
                    {body}
                </p>
                <p className="single-comment-details">
                    <span>
                        <Link to={'/user/' + user._id}>{user.name}  .</Link>
                    </span>
                    <span> {moment(date).fromNow()} .</span>
                    {
                        currentUser.id === user._id && 
                            <button className="delete-comment-btn" onClick={() => this.deleteComment()}>
                                {this.state.deleting ? '...' : 'Delete'}
                            </button>
                    }
                </p>
            </div>
        )
    }
}

export default SingleComment