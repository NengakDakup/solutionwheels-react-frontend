import React, { Component } from 'react'
import {connect} from 'react-redux'

import {shareQuestion, hideSharePost} from '../../actions'
import { ShareIcon } from '../icons';


class ShareBtn extends Component {
    sharePost(e){
        const {data} = this.props;
        if (navigator.share) {
            navigator.share({
              title: data.title,
              text: data.body? data.body : '',
              url: `https://solutionwheels.com/question/${data.slug}`
            }).then(() => {
                // maybe log some data for analytics
              this.props.hideSharePost();
            })
            .catch(err => console.log(err));
          } else {
            this.props.shareQuestion(data);
          }
        
    }
    render(){
        return (
            <div className="bottom-actions-share" onClick={(e) => this.sharePost(e)}>
                <span><ShareIcon /></span>
                <span>Share</span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        shareQuestion: (payload) => { dispatch(shareQuestion(payload)) },
        hideSharePost: (payload) => { dispatch(hideSharePost(payload))}
    }
  }

export default connect(null, mapDispatchToProps)(ShareBtn)