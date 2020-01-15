import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

import ProfileImage from '../../../assets/icons/boy.svg'

const SingleProfile = (user) => {
    if(!user) return null;
    const {avatar, email, name, _id, date} = user;
    return (
        <div className="latest-members-profile" key={Date.now() + _id}>
            <Link to={'/user/' + _id}>
                <img src={ProfileImage} alt={'Dakup Nengak'} />
                <p>{name}</p>
                <p>{email}</p>
                <p>{moment(date).fromNow()}</p>
            </Link>
        </div>
    )
}

class LatestMembers extends Component {
    render(){
        const {data} = this.props;
        console.log(data);
        
        return (
            <div className="card latest-members">
                <div className="latest-members-top">
                    <p>Latest Members</p>
                </div>
                <div className="latest-members-profiles">
                    {
                        data.map((element, index) => {
                            if(index <= 6){                                
                                return SingleProfile(element.user)
                            } else {
                                return null;
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

export default LatestMembers