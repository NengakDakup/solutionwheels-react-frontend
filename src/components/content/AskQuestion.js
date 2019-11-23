import React, {Component} from 'react'

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
        const { toggleDropDown } = this.props;
        return (
            <div className="ask-question-outer">
                <div className="ask-question-wrap">
                    <div className="ask-question-top">
                        <p className="ask-question-top-item ask-question-top-item-active"><span>Question Title</span></p>
                        <p className="ask-question-top-item"><span>Explain</span></p>
                        <p className="ask-question-top-item"><span>Add Image</span></p>
                        <button onClick={ () => toggleDropDown('ask')} className="ask-question-x">Close</button>
                    </div>
                    <p>Hellooooo!...</p>
                    
                </div>
            </div>
        )
    }
}

export default AskQuestion