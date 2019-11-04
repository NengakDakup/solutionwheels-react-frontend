import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostFilter extends Component {

    
    render(){
        return (
            <div className="post-filter">
                <ul>
                    <li className="active-filter">Recent Questions</li>
                    <li>Not Answers</li>
                    <li>Most Answered</li>
                    <li>Hottest</li>
                </ul>
            </div>
        )
    }
}

export default PostFilter