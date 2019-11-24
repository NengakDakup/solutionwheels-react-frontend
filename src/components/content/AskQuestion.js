import React, {Component} from 'react'
import axios from 'axios'

import server from '../../config/config'
import validateQuestionInput from '../../validation/questionValidator'

import image from '../../assets/icons/boy.svg';
import { CloseBtn } from '../icons';

class AskQuestion extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            display: false,
            errors: {},
            question: {
                title: null,
                body: null,
                image: null
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    handleChange(e, type){
      this.setState({
        question : {
          ...this.state.question,
          [type]: e.target.value
        }
      })
    }

    displayError(errors){
      console.log(errors)
    }

    validateInput(){
      const data = {name: this.state.question.title, body: this.state.question.body};
      const {errors, isValid} = validateQuestionInput(data);
      if (!isValid) {
          this.displayError(errors);
      } else {
          this.sendToBackend();
      }
    }

    sendToBackend(){
      axios.post(server + '/api/question/create', {
        question_title: this.state.question.title,
        body: this.state.question.body
      })
    }

    render(){
        const { toggleDropDown, data } = this.props;
        return (
            <div className="ask-question-outer">
                <div className="ask-question-wrap">
                    <div className="ask-question-top">
                        <p className="ask-question-top-item ask-question-top-item-active"><span>Ask a Question</span></p>
                        <button onClick={ () => toggleDropDown('ask')} className="ask-question-x">
                            <CloseBtn />
                        </button>
                    </div>
                    <div className="ask-question-user" >
                        <img src={image} alt="profile" />
                        <span><strong>{data.userDetails.username}</strong> asked...</span>
                    </div>
                    <div className="ask-question-section">
                        <p className="title">Question Title</p>
                        <input onChange={(e) => this.handleChange(e, 'title')} type="text" className="ask-question-input-title" placeholder="start your question with what, how, why, etc"/>
                    </div>
                    <div className="ask-question-section">
                        <p className="title">Explain More?</p>
                        <textarea onChange={(e) => this.handleChange(e, 'body')} className="ask-question-input-title" placeholder="This is optional...You can add some explanation if you want to..."/>
                    </div>
                    <div className="ask-question-section">
                        <p className="title">Add an Image</p>
                        <input type="file" />
                    </div>
                    <div className="ask-question-bottom">
                      <button onClick={ () => toggleDropDown('ask')}>close</button>
                      <button onClick={ () => this.validateInput()}>Submit</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default AskQuestion
