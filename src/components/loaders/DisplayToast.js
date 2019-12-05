import React, { Component } from 'react'
import { connect } from 'react-redux'

import { hideToast } from '../../actions'
import { SuccessIcon, ErrorIcon } from '../icons'

class DisplayToast extends Component {
    constructor(props){
      super(props)
      this.state = {
        display: true
      }
      this.hide = this.hide.bind(this)
    }

    hide = () => {
      setTimeout(() => {
        this.props.hideToast();
      }, 3000)
    }

    render() {
      this.hide();
      const {type, message} = this.props;
      return (
        <div className='display-status'>
          {type === 'success' ? <SuccessIcon /> : <ErrorIcon /> }
          <p>{message}</p>
        </div>
      );
    }
}

// //fetch what you want from the store
// const mapStateToProps = (state) => {
//     return {
//         data: state
//     }
// }

const mapDispatchToProps = (dispatch) => {
  return {
      hideToast: (payload) => { dispatch(hideToast(payload)) }
  }
}

export default connect(null, mapDispatchToProps)(DisplayToast);
