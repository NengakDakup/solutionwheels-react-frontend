import React, { Component } from 'react'
import { AddCommentIcon } from '../icons';


class CommentBtn extends Component {
    addAnswer(){
        this.props.addAnswer();
    }
    render(){
        return (
            <div className="bottom-actions-answer" onClick={() => this.addAnswer()}>
                <span><AddCommentIcon /></span>
            </div>
        )
    }
}

export default CommentBtn;