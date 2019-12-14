import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import server from '../../config/config'
import { displayToast } from '../../actions'

import { UpvoteAnswerIcon } from '../icons';


class UpvoteBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            upvoted: false,
            upvotes: []
        }

        this.upvoteAnswer = this.upvoteAnswer.bind(this);
    }

    upvoteAnswer(){
        const {answerId} = this.props;
        this.setState({upvoted: true, clicked: true})
        axios.get(server + '/api/answer/upvote/' + answerId)
            .then(res => {
                this.setState({upvotes: [...res.data.upvotes]})
                this.props.displayToast({type: 'success', message: 'Answer Successfully Upvoted'})
            }).catch(err => {
                this.setState({clicked: false, upvoted: false})
                if(err.response && err.response.data.alreadyupvoted) return this.props.displayToast({type: 'error', message: err.response.data.alreadyupvoted})
                if(err.response) return this.props.displayToast({type: 'error', message: err.response.data})
                this.props.displayToast({type: 'error', message: 'Unknown Error'})
            })
    }

    componentWillMount(){
        const {upvotes, currentUser} = this.props;
        this.setState({
            upvoted: upvotes.filter(user => user.user === currentUser).length >= 1,
            upvotes: [...upvotes]
        })
    }
    
    render(){ 
        return (
            <div className={this.state.upvoted? 'bottom-actions-answer vote voted' : 'bottom-actions-answer vote'} onClick={() => this.upvoteAnswer()}>
                <span>{UpvoteAnswerIcon(this.state.upvoted, this.state.clicked) }</span>
                <span>{this.state.upvoted? 'Upvoted' : 'Upvote'} </span>
                <span className="count">{this.state.upvotes.length}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpvoteBtn);