import React, { Component } from 'react'
import axios from 'axios'

import server from '../../config/config'
import { BtnLoaderSmallWhite } from '../icons';

class AddComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            comment: '',
            answerId: this.props.answerId,
            errors: {}
        }

        this.sendToBackend = this.sendToBackend.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    sendToBackend(e){
        if(e) e.preventDefault();
        if(this.state.comment.length < 10) return this.setState({errors: {error: 'Comment cannot be less than 10 characters'}})
        this.setState({loading: true})
        axios.post(server + '/api/answer/comment/add', {
            body: this.state.comment,
            answer_id: this.state.answerId
        }).then(res => {
            console.log(res.data);
            
            this.setState({loading: false})
            this.props.updateData(res.data);
        }).catch(err => {
            this.setState({loading: false})
        })
    }

    updateValue(e){
        this.setState({
            comment: e.target.value
        })
    }

    render(){
        return (
            <div className="add-comment-wrap">
                <form onSubmit={(e) => this.sendToBackend(e)}>
                    {this.state.errors.error && <span className="error-msg">{this.state.errors.error}</span>}
                    <textarea type="text" className="add-comment-input" placeholder="add comment" onChange={(e) => this.updateValue(e)}/>
                    <button className={this.state.loading? 'add-comment-btn loading-btn' : 'add-comment-btn'} type="submit" disabled={this.state.loading}>
                        {this.state.loading? <BtnLoaderSmallWhite /> : 'Add comment'}
                    </button>
                </form>
            </div>
        )
    }
}

export default AddComment