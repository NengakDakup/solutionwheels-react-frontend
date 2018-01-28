import React, { Component } from 'react'

import SingleAnswer from './SingleAnswer'
import AddAnswer from './AddAnswer'

class Answers extends Component {
    render(){
        return (
            <div>
            <SingleAnswer />
            <SingleAnswer />
            <SingleAnswer />
            <AddAnswer />
            </div>
        )
    }
}

export default Answers