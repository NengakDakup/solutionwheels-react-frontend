import React, { Component } from 'react'
import { AnswerIcon } from '../icons';


class AnswerBtn extends Component {
    addAnswer(){
        this.props.addAnswer();
    }
    render(){
        return (
            <div className="bottom-actions-answer" onClick={() => this.addAnswer()}>
                <span><AnswerIcon /> Answer </span>
            </div>
        )
    }
}

export default AnswerBtn;