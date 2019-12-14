import React, { Component } from 'react';
import axios from 'axios';

import server from '../../config/config'
import ProfileImage from '../../assets/icons/145841-avatar-set/png/man-2.png'
import FollowBtn from '../buttons/Follow';
import { FacebookIcon, GoogleIcon, TwitterIcon, InstagramIcon } from '../icons';

class ProfileDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 'loading',
            errors: {},
            userDetails: {
                name: '----- / ----',
                email: '--/--',
                avatar: '--/--',
                bio: null,
                followers: [],
                questions: [],
                answers: [],
                points: 0,
                socials: {
                    facebook: null,
                    twitter: null,
                    instagram: null,
                    google: null,
                }   
            },
            userPosts: {}
        }
    }

    componentWillMount(){
        const {id} = this.props;
        axios.get(server + '/api/profile/user/' + id)
            .then(res => {
                // check if the user profile was returned or the user details
                const {bio, country, date, followers, gender, social, telephone, username, user} = res.data;
                this.setState({
                    status: 'loaded',
                    errors: {},
                    userDetails: {
                        ...user,
                        bio: bio,
                        followers: followers,
                        socials: {...social}
                    }
                })
            })
            .catch(err => {
                if(err.response) this.setState({errors: err.response.data}, () => console.log(this.state))
            })
    }

    render(){
        const {status, errors } = this.state;
        const { name, _id, followers, bio, socials } = this.state.userDetails;
        return(
            <div className="profile-outer">
                <div className="profile-image-top" >
                    <div className="profile-image-circle">
                        <img src={ProfileImage} alt="" />
                    </div>
                </div>
                <div className="profile-details">
                    <p className="profile-username">{name}<FollowBtn id={_id} currentUser={this.props.currentUser} followers={followers} /></p>
                    {bio && <p className="profile-bio">{bio}</p>}
                    <p className="profile-stats">
                        <span className="profile-points">n Points </span>
                        <span className="profile-questions">n Questions </span>
                        <span className="profile-answers">n Answers</span>
                    </p>
                </div>
                <div className="profile-bottom">
                    {socials.facebook && <a className="facebook-icon" href={socials.facebook}><FacebookIcon /></a>}
                    {socials.twitter && <a className="twitter-icon" href={socials.twitter}><TwitterIcon /></a>}
                    {socials.instagram && <a className="instagram-icon" href={socials.instagram}><InstagramIcon /></a>}
                    {socials.google && <a className="google-icon" href={socials.google}><GoogleIcon /></a>}
                </div>
                {errors.noprofile && <p className="error">User Profile Not Found</p> }
            </div>
        )
    }
}

export default ProfileDetails;