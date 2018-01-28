import React, {Component} from 'react'

class AskQuestion extends Component{
    constructor(props){
        super(props)
        this.state = {
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
                    <p>Hellooooo!...</p>
                    <button onClick={ () => toggleDropDown('ask')}>Close</button>
                </div>
            </div>
        )
    }
}

export default AskQuestion