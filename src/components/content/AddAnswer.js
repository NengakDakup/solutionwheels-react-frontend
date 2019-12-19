import React, { Component } from 'react'
import axios from 'axios'

import TextEditor from './TextEditor'
import { connect } from 'react-redux'

import server from '../../config/config'
import { displayToast } from '../../actions'

import image from '../../assets/icons/boy.svg';
import { BtnLoaderSmallWhite } from '../icons'

class AddAnswer extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            errors: {},
            answer: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendToBackend = this.sendToBackend.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    validateInput(){
        const {answer} = this.state;
        if(!answer.blocks) return this.setState({errors: {error: "Answer cannot be empty"}});
        if(answer.blocks.length < 1) return this.setState({errors: {error: "Answer cannot be empty"}});
        let text = '';
        answer.blocks.forEach(element => {
            text += element.text;
        });
        if(text.length < 20) return this.setState({errors: {error: "Answer cannot be less than 20 characters"}});
        this.setState({errors: {}})
        this.sendToBackend();
    }

    sendToBackend(){
        this.setState({
            loading: true,
            errors: {}
        })
        axios.post(server + '/api/answer/create', {body: this.state.answer, question_id: this.props.ques_id})
            .then(res => {
                this.setState({loading: false, errors: {}})
                this.props.displayToast({type: 'success', message: 'Answer Added!'})
                this.props.updateData && this.props.updateData(res.data);
                this.props.addAnswer();
            }).catch(err => {
                this.setState({loading: false})
                if(err.response) return this.props.displayToast({type: 'error', message: err.response.data})
                return this.props.displayToast({type: 'error', message: 'Network Error'})
            })
    }

    handleChange(data){
        this.setState({
            answer: data
        })
    }

    render(){
        const { data, addAnswer } = this.props;
        return (
            <div className="add-answer-wrap">
                <div className="ask-question-user" >
                    <img src={image} alt="profile" />
                    <span><strong>{data.userDetails.username}</strong> answered...</span>
                </div>
                <TextEditor handleChange={this.handleChange} />
                {this.state.errors && <p className="danger-text">{this.state.errors.error}</p>}
                <div className="add-answer-bottom">
                    <button onClick={() => this.validateInput()} className="add-answer-btn">
                        {this.state.loading? <BtnLoaderSmallWhite /> : 'Submit'}
                    </button>
                    <button onClick={() => addAnswer()} className="add-answer-cancel-btn">cancel</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayToast: (payload) => { dispatch(displayToast(payload)) },
    }
}

const mapStateToProps = (state) => {
    return {
        data: state 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAnswer);
