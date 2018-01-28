import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SingleComment extends Component {
    render(){
        return (
            <div className="single-comment">
                <p>
                    Are you trying to get us to do your assignment or what? You can easily get this done yourself nah...dont be lazy oh...
                </p>
                <p className="single-comment-details">
                    <span>
                        <Link to="/profile">Username  .</Link>
                    </span>
                    <span>  15 Mins Ago</span>
                </p>
            </div>
        )
    }
}

export default SingleComment