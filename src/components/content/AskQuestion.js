import React, {Component} from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { addQuestion } from '../../actions'
import server from '../../config/config'
import validateQuestionInput from '../../validation/questionValidator'

import image from '../../assets/icons/boy.svg';
import { CloseBtn } from '../icons';
import { BtnLoaderSmall } from '../icons'

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
        this.sendToBackend = this.sendToBackend.bind(this);
    }

    handleChange(e, type){
      this.setState({
        question : {
          ...this.state.question,
          [type]: e.target.value
        }
      })
    }

    displayError(error){
      this.setState({
        ...error
      })
    }

    validateInput(){
      this.setState({
        loading: true
      });
      const data = {title: this.state.question.title, body: this.state.question.body};
      const {errors, isValid} = validateQuestionInput(data);
      if (!isValid) {
        this.setState({
          loading: false
        });
        this.displayError({errors});
      } else {
          this.sendToBackend();
      }
    }

    sendToBackend(){
      axios.post(server + '/api/question/create', {
        question_title: this.state.question.title,
        body: this.state.question.body
      })
      .then(res => {
          this.setState({
              loading: false,
              errors: {}
          })
          // update the redux state
          this.props.addQuestion(res.data);
          console.log(res.data);
      })
      .catch(err => {
          if(err.response.data) {
              this.displayError(err.response.data);
          }
      })
      .finally(() => {
          this.setState({
              loading: false
          });
      });
    }

    render(){
        const { toggleDropDown, data } = this.props;
        const { title, body } = this.state.errors;
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
                        {title && <span className="error-msg">{title}</span>}
                        <input onChange={(e) => this.handleChange(e, 'title')} type="text" className="ask-question-input-title" placeholder="start your question with what, how, why, etc"/>
                    </div>
                    <div className="ask-question-section">
                        <p className="title">Explain More?</p>
                        {body && <span className="error-msg">{body}</span>}
                        <textarea onChange={(e) => this.handleChange(e, 'body')} className="ask-question-input-text" placeholder="This is optional...You can add some explanation if you want to..."/>
                    </div>
                    <div className="ask-question-section">
                        <p className="title">Add an Image</p>
                        <input type="file" />
                    </div>
                    <div className="ask-question-bottom">
                      <button onClick={ () => toggleDropDown('ask')}>close</button>
                      <button onClick={ () => this.validateInput()}>
                        {this.state.loading? <BtnLoaderSmall /> : 'Submit'}
                      </button>
                    </div>

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: (payload) => { dispatch(addQuestion(payload)) },
    }
}

export default connect(null, mapDispatchToProps)(AskQuestion);
