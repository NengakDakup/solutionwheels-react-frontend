import React, {Component} from 'react'
import CountCard from '../Components/CountCard'
import LatestMembers from '../Components/LatestMembers'
import QuestionOfTheWeek from '../../../components/content/QuestionOfTheMonth'
import UserOfTheWeek from '../../../components/content/UserOfTheWeek'
import TopQuestions from '../../../components/content/TopQuestions'

class Overview extends Component {
    render(){
        const {data} = this.props;
        let likes = 0;
        let upvotes = 0;
        let solved = 0;
        data.questions.forEach(element => {            
            likes += element.likes.length;
            element.best_answer && solved++;
        });
        data.answers.forEach(element => {
            upvotes += element.upvotes.length
        })
        return(
            <div className="admin-content">
                <div className="cards-wrapper">
                    <CountCard count={data.profiles.length} text={'Total Users'} load={'users'} setActiveTab={this.props.setActiveTab} />
                    <CountCard count={data.questions.length} text={'Total Questions'} load={'questions'} setActiveTab={this.props.setActiveTab}/>
                    <CountCard count={data.answers.length} text={'Total Answers'} load={null} setActiveTab={this.props.setActiveTab}/>
                    <CountCard count={likes} text={'Total Likes'} load={null} />
                    <CountCard count={upvotes} text={'Total Upvotes'} load={null} />
                    <CountCard count={solved} text={'Solved Questions'} load={null} />
                </div>
                <div className="cards-wrapper">
                    <LatestMembers data={data.profiles} />
                </div>
                <div className="cards-wrapper week-details">
                    <QuestionOfTheWeek />
                    <UserOfTheWeek />
                    <TopQuestions />
                </div>
            </div>
        )
    }
}

export default Overview