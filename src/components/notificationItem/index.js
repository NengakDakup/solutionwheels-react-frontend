import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

import server from '../../config/config'

import ProfileImage from '../../assets/icons/boy.svg'
import {    LikedIcon, 
            AnswerIcon, 
            AddCommentIcon, 
            UpvoteAnswerIcon, 
            DownvoteAnswerIcon, 
            FollowIcon,
            SuccessIconAnswer,
            ShareIcon
        } 
    from '../icons'

class NotificationItem extends Component {
    constructor(props){
        super(props);
        this.markAsRead = this.markAsRead.bind(this);
    }

    markAsRead(){
        axios.get(server + '/api/notification/markread/' + this.props.data._id)
            .then(res => console.log(res))
    }

    render(){
        const {read, seen, date, reaction, link, title, user, _id, triggeredBy} = this.props.data;
        return (
            <li className={read? 'notification-item read-notification-item' : 'notification-item'} onClick={() => this.markAsRead()}>
                <Link to={link}>
                    <div className="notification-item-left">
                        {reaction === 'Liked' && LikedIcon(false)}
                        {reaction === 'Answered' && <AddCommentIcon />}
                        {reaction === 'Shared' && <ShareIcon />}
                        {reaction === 'Upvoted' && UpvoteAnswerIcon(true)}
                        {reaction === 'Downvoted' && DownvoteAnswerIcon(true)}
                        {reaction === 'Approved' && <SuccessIconAnswer />}
                        {reaction === 'Followed' && <FollowIcon /> }
                        {reaction === 'Commented' && <AddCommentIcon /> }
                    </div>
                    <div className="notification-item-right">
                        <p className="notification-item-time">{moment(date).fromNow()}</p>
                        <p className="notification-item-title">{title}</p>
                        <p className="notification-item-brief">{link}</p>
                    </div>
                </Link>
            </li>
        )
    }
}

export default NotificationItem