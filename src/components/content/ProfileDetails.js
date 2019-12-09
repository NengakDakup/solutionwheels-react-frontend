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
            userDetails: {},
            userPosts: {}
        }
    }

    componentWillMount(){
        const {id} = this.props;
        // axios.get(server + '/api/profile/' + id)
        this.setState({
            userDetails: {
                name: 'David Jones',
                email: 'davidjones@gmail.com',
                avatar: 'link/to/image',
                bio: 'My name is David Jones and i\'m a dummy user',
                followers: 10,
                questions: 5,
                answers: 15,
                points: 89,
                socials: {
                    facebook: 'link to facebook',
                    twitter: 'link to twitter',
                    instagram: 'link to instagram',
                    google: 'link to gmail',
                }   
            }
        })
    }

    render(){
        const { userDetails } = this.state;
        return(
            <div className="profile-outer">
                <div className="profile-image-top" >
                    <div className="profile-image-circle">
                        <img src={ProfileImage} alt="" />
                    </div>
                </div>
                <div className="profile-details">
                    <p className="profile-username">{userDetails.name}<FollowBtn /></p>
                    <p className="profile-bio">{userDetails.bio}</p>
                    <p className="profile-stats">
                        <span className="profile-points">100 Points </span>
                        <span className="profile-questions">5 Questions </span>
                        <span className="profile-answers">13 Answers</span>
                    </p>
                </div>
                <div className="profile-bottom">
                    <a className="facebook-icon" href={userDetails.socials.facebook}><FacebookIcon /></a>
                    <a className="twitter-icon" href={userDetails.socials.twitter}><TwitterIcon /></a>
                    <a className="instagram-icon" href={userDetails.socials.instagram}><InstagramIcon /></a>
                    <a className="google-icon" href={userDetails.socials.google}><GoogleIcon /></a>
                </div>
            </div>
        )
    }
}

export default ProfileDetails;