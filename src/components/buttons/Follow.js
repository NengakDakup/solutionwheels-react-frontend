import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import {displayToast} from '../../actions'
import server from '../../config/config'

import { FollowIcon } from '../icons';


class FollowBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            recieved: false,
            following: false,
            followers: this.props.followers
        }

        this.followUser = this.followUser.bind(this)
    }

    componentDidUpdate(){
        const {id, followers, currentUser} = this.props;
        
        if(followers.length < 1 || this.state.recieved) return;
        // id is the users id to be followed
        // current id is the users id who wants to follow
        if(followers.filter(user => user.user === currentUser).length >= 1){
            this.setState({
                recieved: true,
                following: true
            })
        }  
        this.setState({recieved: true, followers: followers})
    }

    followUser(){
        const { id } = this.props;
        this.setState({
            loading: true,
            following: !this.state.following
        })
        axios.get(server + '/api/profile/follow/' + id)
            .then(res => {
                // display toast
                this.setState({
                    loading: false,
                    followers: res.data.followers
                })
            }).catch(err => {
                this.setState({
                    loading: false,
                    following: !this.state.following
                })
                // display toast
                if (err.response) return this.props.displayToast({type: 'Error', message: err.response.data})
                if(!err.response) return this.props.displayToast({type: 'error', message: 'Network Error'})
            })
    }

    render(){
        return (
            <button className={this.state.following? 'follow-btn following' : 'follow-btn'} onClick={() => this.followUser()} disabled={this.state.loading}>
                <FollowIcon />
                <span className="follow-text">{this.state.following? 'Unfollow' : 'Follow'}</span> 
                <span className="follow-count">{this.state.followers.length}</span>
            </button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayToast: (payload) => { dispatch(displayToast(payload)) }
    }
}

export default connect(null, mapDispatchToProps)(FollowBtn);