import React, { Component } from 'react'
import axios from 'axios'

import server from '../../config/config'

import SingleAnswer from './SingleAnswer'
import AddAnswer from './AddAnswer'

//answers loader
//profile loader
class Answers extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            errors: {},
            answers: this.props.data
        }
    }

    render(){
        return (
            <div className="answers-wrapper">
                {this.state.loading && <p>Loading Answers...</p>}
                {this.state.errors.noanswers && <p>{this.state.errors.noanswers}</p>}
                {this.props.data.map((answer, index) => {
                    return <SingleAnswer 
                                data={answer} 
                                questionOwner={this.props.questionOwner} 
                                questionId={this.props.id} 
                                bestId={this.props.bestId} 
                                key={answer._id + Date.now()} 
                                updateData={this.props.updateData}
                                deleteAnswer={this.props.deleteAnswer} />
                })}
            </div>
        )
    }
}

export default Answers