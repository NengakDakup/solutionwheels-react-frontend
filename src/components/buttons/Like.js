import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import server from '../../config/config'
import { connect } from 'react-redux'
import { likeQuestion } from '../../actions'
import DisplayStatus from '../loaders/DisplayStatus'

import { LikeIcon, LikedIcon } from '../icons'

class LikeBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            liked: false,
            loading: false,
            likes: this.props.likes.length
        }

        this.likeQuestiont = this.likeQuestion.bind(this);
        this.sendToBackend = this.sendToBackend.bind(this);
    }

    componentWillMount(){
        if(localStorage.getItem('user_token')) {
            const { id } = jwt_decode(localStorage.getItem('user_token'));
            const liked = this.props.likes.find(like => like.user === id);
            if (liked) {
                this.setState({
                    liked: true
                })
            }
        }
    }

    likeQuestion(){
        this.setState({
            loading: true
        })
        this.sendToBackend();
    }

    sendToBackend(){
        const {ques_id} = this.props;
        axios.post(server + '/api/question/like/' + ques_id, {})
            .then(response => {
                if(response.status === 200) {
                    this.setState({
                        loading: false,
                        likes: this.state.liked? this.state.likes - 1 : this.state.likes + 1,
                        liked: !this.state.liked,
                    });
                    // dispatch the action to redux
                    this.props.likeQuestion(response.data);
                }
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
                if (err.response) return console.log(err.response.data)
                console.log(err);
                //if its unauthorized
                //revert the changes
                //inform the user he must be logged in
                //clear the localstorage
                //redirect to the login page
                localStorage.removeItem('user_token');
            })
    }
    //check if current users id is in the array of likes
    //
    render(){
        const {liked, likes, loading} = this.state;
        const text = loading? <span>...</span> : <span>{liked? <LikedIcon /> : <LikeIcon />} {liked? 'Liked': 'Like'} . {likes}</span>;
        return (
            <div className="bottom-actions-like" onClick={() => this.likeQuestion()}>
                {text}
            </div>

        )
    }
}

// //fetch what you want from the store
// const mapStateToProps = (state) => {
//     return {
//         data: state
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        likeQuestion: (payload) => { dispatch(likeQuestion(payload)) },
    }
}

export default connect(null, mapDispatchToProps)(LikeBtn);
