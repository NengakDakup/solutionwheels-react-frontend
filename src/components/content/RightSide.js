import React, { Component } from 'react'
import UserOfTheWeek from './UserOfTheWeek'
import QuestionOfTheWeek from './QuestionOfTheMonth'
import TopQuestions from './TopQuestions'
import { BlueLoader } from '../icons';
// import { Link } from 'react-router-dom'

class RightSide extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            userOfTheWeek: null,
            questionOfTheWeek: null,
            topQuestions: null
        }
    }

    
    render(){
        const {loading, userOfTheWeek, questionOfTheWeek, topQuestions} = this.state;
        return (
            <div className="right-side">
                {loading && <BlueLoader />}
                {(!this.state.loading && userOfTheWeek === null) &&<UserOfTheWeek /> }
                {(!this.state.loading && questionOfTheWeek === null) && <QuestionOfTheWeek /> }
                {(!this.state.loading && topQuestions === null) && <TopQuestions />}
            </div>
        )
    }
}

export default RightSide