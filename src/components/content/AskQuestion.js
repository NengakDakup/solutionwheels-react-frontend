import React, {Component} from 'react'

import image from '../../assets/icons/boy.svg';
import { CloseBtn } from '../icons';

class AskQuestion extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            display: false,
            question: {
                title: null,
                body: null
            }
        }
    }

    render(){
        const { toggleDropDown, data } = this.props;
        return (
            <div className="ask-question-outer">
                <div className="ask-question-wrap">
                    <div className="ask-question-top">
                        <p className="ask-question-top-item ask-question-top-item-active"><span>Question Title</span></p>
                        <p className="ask-question-top-item"><span>Explain</span></p>
                        <p className="ask-question-top-item"><span>Add Image</span></p>
                        <button onClick={ () => toggleDropDown('ask')} className="ask-question-x">
                            <CloseBtn />
                        </button>
                    </div>
                    <div className="ask-question-user" >
                        <img src={image} alt="profile" />
                        <strong>{data.userDetails.username}</strong>
                        <span> Asked...</span>
                    </div>
                    <div>
                        <p>Question Title</p>
                        <input type="text" placeholder="start your question with what, how, why, etc"/>
                    </div>
                    <div>
                        <p>Add an Image</p>
                        <input type="file" />
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default AskQuestion