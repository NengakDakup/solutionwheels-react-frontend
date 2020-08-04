import React, { Component } from 'react'

class NotificationSettings extends Component {
    render(){
        return (
            <div className="main-content-item">
                <p>Notification Settings</p>
                <form>
                    <p>What notifications do you want to recieve in your mail?</p>
                    <ul>
                        <li><input type="checkbox" checked/> Answers</li>
                        <li><input type="checkbox" checked/> Comments</li>
                        <li><input type="checkbox" /> Votes</li>
                        <li><input type="checkbox" /> Likes</li>
                        <button>Save</button>
                    </ul>
                </form>
            </div>
        )
    }
}

export default NotificationSettings