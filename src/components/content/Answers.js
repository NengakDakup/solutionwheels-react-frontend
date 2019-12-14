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
            loading: true,
            errors: {},
            answers: []
        }
    }

    componentWillMount(){
        const {id} = this.props;
        axios.get(server + '/api/answer/for/' + id)
            .then(res => {
                this.setState({
                    loading: false,
                    errors: {},
                    answers: res.data
                })
            }).catch(err => {
                if(err.response) this.setState({loading: false, errors: err.response.data});
                console.log(err);
            })
    }
    render(){
        
        return (
            <div className="answers-wrapper">
                {this.state.loading && <p>Loading Answers...</p>}
                {this.state.errors.noanswers && <p>{this.state.errors.noanswers}</p>}
                {this.state.answers.map((answer, index) => {
                    return <SingleAnswer data={answer} questionOwner={this.props.questionOwner} questionId={this.props.id} bestId={this.props.bestId} key={answer._id} />
                })}
            </div>
        )
    }
}

export default Answers