import React, { Component } from 'react'

class AddAnswer extends Component {
    render(){
        return (
            <div class="add-answer-wrap">
                <input type="text" placeholder="add answer" />
                <button>Add Answer</button>
            </div>
        )
    }
}

export default AddAnswer