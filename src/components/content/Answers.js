import React, { Component } from 'react'

import SingleAnswer from './SingleAnswer'
import AddAnswer from './AddAnswer'

class Answers extends Component {
    render(){
        const {data} = this.props;
        return (
            <div className="answers-wrapper">
            <SingleAnswer data={data} />
            <SingleAnswer data={data} />
            <SingleAnswer data={data} />
            <AddAnswer />
            </div>
        )
    }
}

export default Answers