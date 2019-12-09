import React, {Component} from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { addQuestion } from '../../actions'
import server from '../../config/config'
import validateQuestionInput from '../../validation/questionValidator'

import image from '../../assets/icons/boy.svg';
import { CloseBtn } from '../icons';
import { BtnLoaderSmallWhite } from '../icons'

class AskQuestion extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            display: false,
            imagePreviewURL: '',
            errors: {},
            question: {
                title: null,
                body: null,
                image: null,
                category: null
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.displayError = this.displayError.bind(this);
        this.sendToBackend = this.sendToBackend.bind(this);
    }

    handleChange(e, type){
      e.preventDefault();
      if(type === 'image') {
        // image preview feature
        const reader = new FileReader();
        const image = e.target.files[0];
        reader.readAsDataURL(image);

        reader.onloadend = () => {
          this.setState({
            imagePreviewURL: reader.result,
            question: {
              ...this.state.question,
              [type]: image
            }
          })
        }
      } else {
        this.setState({
          question : {
            ...this.state.question,
            [type]: e.target.value
          }
        })
      }      
    }

    displayError(error){
      this.setState({
        ...error
      })
    }

    validateInput(e){
      e.preventDefault();
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
      const formData = new FormData();
      formData.append('image', this.state.question.image);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      // first of all, upload the image
      axios.post(server + '/api/upload/question', formData, config)
      .then(res => {
          let imagePath = null;
          //image is succesfully uploaded
          if (res.data.upload) {
            imagePath = server + '/uploads/' + res.data.upload.filename;
          }
          //upload the details now
          axios.post(server + '/api/question/create', {
            question_title: this.state.question.title,
            body: this.state.question.body,
            image: imagePath
          }).then(res => {
            this.setState({
              loading: false,
              errors: {}
            });
            // update the redux state
            this.props.addQuestion(res.data);
            window.location.href = `/question/${res.data.slug}`;
          }).catch(err => {
            this.setState({loading: false, errors: {}})
            if(err.response) {
              this.setState({errors: err.response.data});
            }
            //display toast error
            console.log(err)
          })
      })
      .catch(err => {
        this.setState({loading: false, errors: {}})
          if(err.response) {
          this.setState({errors: err.response.data});
          }
          //display toast error
          console.log(err);
      })
    }

    render(){
        const { toggleDropDown, data } = this.props;
        const { title, body } = this.state.errors;
        return (
            <div className="ask-question-outer">
                <div className="ask-question-wrap">
                  <form onSubmit={this.validateInput}>
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
                      <p className="title">Category</p>
                      <select onChange={(e) => this.handleChange(e, 'category')}>
                        <option>Programming</option>
                        <option>Technology</option>
                        <option>Education</option>
                      </select>
                    </div>
                    <div className="ask-question-section">
                        <p className="title">Add an Image</p>
                        <input onChange={(e) => this.handleChange(e, 'image')} type="file" accept="image/*" />
                        { this.state.imagePreviewURL && 
                          <div className="image-upload-preview">
                            <img src={this.state.imagePreviewURL} alt="upload preview" />
                          </div>
                        }
                    </div>
                    <div className="whitespace"></div>
                    <div className="ask-question-bottom">
                      <button className="ask-question-bottom-close" onClick={ () => toggleDropDown('ask')}>close</button>
                      <button className="ask-question-bottom-submit" type="submit">
                        {this.state.loading? <BtnLoaderSmallWhite /> : 'Submit'}
                      </button>
                    </div>
                  </form>
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
