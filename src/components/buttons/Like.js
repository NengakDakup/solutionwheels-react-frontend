import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'

import server from '../../config/config'
import { likeQuestion, displayToast } from '../../actions'

import { LikeIcon, LikedIcon } from '../icons'

class LikeBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            liked: false,
            loading: false,
            clicked: false,
            likes: this.props.likes.length
        }

        this.likeQuestion = this.likeQuestion.bind(this);
        this.sendToBackend = this.sendToBackend.bind(this);
    }

    componentWillMount(){
        const id = this.props.data.userDetails.userId;
        const liked = this.props.likes.find(like => like.user === id);
        if (liked) {
            this.setState({
                liked: true
            })
        }
    }

    likeQuestion(){
        this.setState({
            loading: true
        })
        this.sendToBackend();
    }

    sendToBackend(){
        const { ques_id } = this.props;
        this.setState({clicked: true, liked: !this.state.liked})
        axios.post(server + '/api/question/like/' + ques_id, {})
            .then(response => {                
                if(response.status === 200) {
                    this.setState({
                        likes: response.data.likes.length
                    });
                    // dispatch the action to redux
                    this.props.likeQuestion(response.data);
                }
            })
            .catch(err => {
                this.setState({
                    liked: false
                })
                if (err.response) return this.props.displayToast({type: 'error', message: err.response.data})
                console.log(err);
            })
    }
    //check if current users id is in the array of likes
    render(){
        const {liked, likes, clicked } = this.state;
        return (
            <div className={liked? 'bottom-actions-like liked' : 'bottom-actions-like'} onClick={() => this.likeQuestion()}>
                <span>{liked? LikedIcon(clicked) : <LikeIcon />} {liked? 'Liked': 'Like'} . {likes}</span>
            </div>

        )
    }
}

//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        data: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeQuestion: (payload) => { dispatch(likeQuestion(payload)) },
        displayToast: (payload) => { dispatch(displayToast(payload)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeBtn);
