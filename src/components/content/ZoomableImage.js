import React, { Component } from "react";
import { connect } from 'react-redux'

import { displayImageViewer } from '../../actions'

class ZoomableImage extends Component {
    render(){
        const {src, alt, displayImageViewer} = this.props;
        return (
            <img src={src} alt={alt} onClick={() => displayImageViewer({image: src})} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayImageViewer: (payload) => { dispatch(displayImageViewer(payload)) }
    }
  }
  
export default connect(null, mapDispatchToProps)(ZoomableImage); 