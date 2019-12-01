import React, { Component } from 'react'
import { ShareIcon } from '../icons';


class ShareBtn extends Component {
    sharePost(){
        alert('share post');
    }
    render(){
        return (
            <div className="bottom-actions-share" onClick={() => this.sharePost()}>
                <span><ShareIcon /></span>
                <span>Share</span>
            </div>
        )
    }
}

export default ShareBtn;