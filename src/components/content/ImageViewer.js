import React, {Component} from 'react'
import { connect } from 'react-redux'

import { hideImageViewer } from '../../actions'
import { CloseBtn } from '../icons';

class ImageViewer extends Component {
    render(){
        const { image } = this.props.data;
        
        return (
            <div className="image-viewer">
                <button className="image-viewer-close-btn" onClick={() => this.props.hideImageViewer()}>
                    <CloseBtn />
                </button>
                <div className="image-viewer-image-wrap">
                    <img src={image} alt={image} />
                </div>
            </div>
        )
    }
}


//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        data: state.imageViewer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideImageViewer: (payload) => { dispatch(hideImageViewer(payload)) }
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(ImageViewer);
