import React, { Component } from 'react'

class AddComment extends Component {
    render(){
        return (
            <div class="add-comment-wrap">
                <input type="text" placeholder="add comment" />
                <button>Add comment</button>
            </div>
        )
    }
}

export default AddComment