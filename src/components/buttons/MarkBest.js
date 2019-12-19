import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import server from '../../config/config'
import { displayToast } from '../../actions'
import { SuccessIconAnswer } from '../icons'

class MarkBestBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    
        this.sendToBackend = this.sendToBackend.bind(this);
    }

    sendToBackend(){
        const {questionId, answerId} = this.props;
        axios.post(server + '/api/question/approve/', {
            questionId,
            answerId
        }).then(res => {
            this.props.displayToast({type: 'success', message: 'Answer Successfully Approved'})
            console.log(res.data);
            
            this.props.updateData(res.data);
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        return (
            <div className="bottom-actions-answer mark-best" onClick={() => this.sendToBackend()}>
                <span>Approve Answer</span>
                <SuccessIconAnswer />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayToast: (payload) => { dispatch(displayToast(payload)) }
    }
}

export default connect(null, mapDispatchToProps)(MarkBestBtn)