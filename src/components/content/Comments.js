import React, { Component } from 'react'

import SingleComment from './SingleComment'
import AddComment from './AddComment'
import { AddCommentIcon, DownArrow, UpArrow } from '../icons'

class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayComments: false
        }
        this.toggleComments = this.toggleComments.bind(this);
    }

    toggleComments(){
        this.setState({
            displayComments: !this.state.displayComments
        })
    }

    render(){
        const {comments, answerId, updateData} = this.props;
        
        return (
            <div className="single-comment-wrap">
                <div className="comments-toggle" onClick={() => this.toggleComments()}>
                    <AddCommentIcon />
                    <span>{comments.length} {comments.length > 1 ? 'Comments' : 'Comment'} {this.state.displayComments? <UpArrow /> : <DownArrow />}</span>
                </div>
                {
                    this.state.displayComments && 
                        <div className="single-item-comment-wrap">
                            {
                                comments.length >= 1 ?
                                    <div>
                                        {comments.map(comment => <SingleComment key={comment._id + Date.now()} comment={comment} answerId={answerId} updateData={updateData}/>)}
                                    </div> :
                                    <span>No Comments</span>
                            }
                            <AddComment answerId={answerId} updateData={updateData} />  
                        </div>
                } 
            </div>
        )
    }
}

export default Comments