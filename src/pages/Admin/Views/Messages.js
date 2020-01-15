import React, {Component} from 'react'
import CountCard from '../Components/CountCard'
import LatestMembers from '../Components/LatestMembers'
import QuestionOfTheWeek from '../../../components/content/QuestionOfTheMonth'
import UserOfTheWeek from '../../../components/content/UserOfTheWeek'
import TopQuestions from '../../../components/content/TopQuestions'

class Messages extends Component {
    render(){
        return(
            <div className="admin-content">
                <div className="messages-wrapper">
                    <div className="messages-top">
                        <p>Dashboard > Site Messages</p>
                    </div>
                    <div className="single-comment message">
                        <p>
                            {' message body thats passes information to the seer of the message so as to know what was in the thoughts of the intended sender of the message for the purposes of hearing and to aid in the passing of information to the intended reciever...'}
                        </p>
                        <div className="message-sender">
                            <p>Dakup Nengak</p>
                            <p>nengakdakup@gmail.com</p>
                            <p>5 days Ago</p>
                        </div>
                    </div>
                    <div className="single-comment message">
                        <p>
                            {' message body thats passes information to the seer of the message so as to know what was in the thoughts of the intended sender of the message for the purposes of hearing and to aid in the passing of information to the intended reciever...'}
                        </p>
                        <div className="message-sender">
                            <p>Dakup Nengak</p>
                            <p>nengakdakup@gmail.com</p>
                            <p>5 days Ago</p>
                        </div>
                    </div>
                    <div className="single-comment message">
                        <p>
                            {' message body thats passes information to the seer of the message so as to know what was in the thoughts of the intended sender of the message for the purposes of hearing and to aid in the passing of information to the intended reciever...'}
                        </p>
                        <div className="message-sender">
                            <p>Dakup Nengak</p>
                            <p>nengakdakup@gmail.com</p>
                            <p>5 days Ago</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages