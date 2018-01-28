import React, { Component } from 'react'

import SingleComment from './SingleComment'
import AddComment from './AddComment'
import { AddCommentIcon } from '../icons'

class Comments extends Component {
    render(){
        return (
            <div className="single-comment-wrap">
                <p><pre><AddCommentIcon /> 5 Comments</pre></p>
                <SingleComment />   
                <SingleComment />   
                <SingleComment />
                <AddComment />   
            </div>
        )
    }
}

export default Comments