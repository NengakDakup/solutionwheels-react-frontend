import React, {Component} from 'react'
import {connect} from 'react-redux'

import {hideSharePost} from '../../actions'
import {FacebookIcon, TwitterIcon, InstagramIcon, WhatsappIcon} from '../icons'

class ShareQuestion extends Component {
    container = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);

    }

    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);

    }

    handleClickOutside = (event) => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.props.hideSharePost();
          }
    }

    openWindow(url){
        var left = (window.screen.width - 570) / 2;
        var top = (window.screen.height - 570) / 2;
        var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
        window.open(url,"NewWindow",params);
    }

    openShare(provider){
        const {question} = this.props.data;
        
        switch (provider) {
            case 'facebook':
                let facebook_article = `https://solutionwheels.com/question/${question.slug}`;
                let facebook_encodedArticle = encodeURI(facebook_article);
                let facebook_url = `https://www.facebook.com/sharer.php?u=${facebook_encodedArticle}`;
                this.openWindow(facebook_url);
                this.props.hideSharePost();
                break;
            case 'twitter':
                let twitter_article = `https://solutionwheels.com/question/${question.slug}`;
                let body = question.body? question.body: 'Help Answer this Question on Solution Wheels';
                let hashTags = `solutionwheels,question,${question.category_id? question.category_id : 'general'}`;
                let twitter_encodedArticle = encodeURI(twitter_article);
                let twitter_encodedBody = encodeURI(body);
                let twitter_encodedHashTags = encodeURI(hashTags);
                let twitter_url = `https://twitter.com/intent/tweet?url=${twitter_encodedArticle}&text=${twitter_encodedBody}&hashtags=${twitter_encodedHashTags}`;
                this.openWindow(twitter_url);
                this.props.hideSharePost();
                break;
            default:
                break;
        }
    }
    
    render(){
        return (
            <div className="share-question-wrap zoomInUp" ref={this.container}>
                <div className="share-question-title">
                    <p>Share On</p>
                </div>
                <ul>
                    <li onClick={() => this.openShare('facebook')}>                       
                        <FacebookIcon /> Facebook
                    </li>
                    <li><InstagramIcon /> Instagram</li>
                    <li onClick={() => this.openShare('twitter')}><TwitterIcon /> Twitter</li>
                    <li><WhatsappIcon /> Whatsapp</li>
                    <li className="share-question-cancel" onClick={() => this.props.hideSharePost()}>Cancel</li>
                </ul>
            </div>
        )
    }
}


//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        data: state.shareQuestion
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideSharePost: (payload) => { dispatch(hideSharePost(payload)) }
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(ShareQuestion);
