import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import server from '../../config/config'
import { displayToast } from '../../actions'

import { DownvoteAnswerIcon } from '../icons';


class DownvoteBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            downvoted: false,
            downvotes: []
        }

        this.downvoteAnswer = this.downvoteAnswer.bind(this);
    }

    downvoteAnswer(){
        const {answerId} = this.props;
        this.setState({downvoted: true, clicked: true})
        axios.get(server + '/api/answer/downvote/' + answerId)
            .then(res => {
                this.props.updateData(res.data)
                this.props.displayToast({type: 'success', message: 'Answer Successfully Downvoted'})
            }).catch(err => {
                this.setState({clicked: false, downvoted: false})
                if(err.response && err.response.data.alreadydownvoted) {
                    this.setState({downvoted: !this.state.downvoted})
                    return this.props.displayToast({type: 'error', message: err.response.data.alreadydownvoted})
                }
                if(err.response) return this.props.displayToast({type: 'error', message: err.response.data})
                this.props.displayToast({type: 'error', message: 'Unknown Error'})
            })
    }
    
    render(){
        const {downvotes} = this.props; 
        const downvoted = downvotes.filter(user => user.user === this.props.currentUser).length >= 1;
        return (
            <div className={downvoted || this.state.downvoted? 'bottom-actions-answer vote voted' : 'bottom-actions-answer vote'} onClick={() => this.downvoteAnswer()}>
                <span>{DownvoteAnswerIcon(downvoted || this.state.downvoted, this.state.clicked) }</span>
                <span>{downvoted? 'Downvoted' : 'Downvote'} </span>
                <span className="count">{downvotes.length}</span>
            </div>
        )
    }
}

//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        currentUser: state.userDetails.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayToast: (payload) => { dispatch(displayToast(payload)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownvoteBtn);