import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class QuestionNotFound extends Component {

    
    render(){
        return (
            <div className="question-not-found">
                <h1>-- Oops --</h1>
                <h4>Question not found...</h4>
                <p>This Question might have been deleted or does not exist...</p>
            </div>
        )
    }
}

export default QuestionNotFound