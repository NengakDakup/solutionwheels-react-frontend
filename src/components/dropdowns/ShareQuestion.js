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
    render(){
        return (
            <div className="share-question-wrap zoomInUp" ref={this.container}>
                <div className="share-question-title">
                    <p>Share On</p>
                </div>
                <ul>
                    <li><FacebookIcon /> Facebook</li>
                    <li><InstagramIcon /> Instagram</li>
                    <li><TwitterIcon /> Twitter</li>
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
