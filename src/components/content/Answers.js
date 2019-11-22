import React, { Component } from 'react'

import SingleAnswer from './SingleAnswer'
import AddAnswer from './AddAnswer'

class Answers extends Component {
    render(){
        return (
            <div className="answers-wrapper">
            <SingleAnswer />
            <SingleAnswer />
            <SingleAnswer />
            <AddAnswer />
            </div>
        )
    }
}

export default Answers