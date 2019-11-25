import React, { Component } from 'react'
import { PulseLoader } from 'react-spinners'

import { BtnLoader, SuccessIcon, ErrorIcon } from '../icons'

class DisplayStatus extends Component {
  // error?success
  // message
    constructor(props){
      super(props)
      this.state = {
        display: true
      }
      this.hide = this.hide.bind(this)
    }

    hide = () => {
      setTimeout(() => {
        this.setState({
          display: false
        })
      }, 5000)
    }

    render() {
      this.hide();
      const {type, message} = this.props;
      return (
        <div className={this.state.display ? 'display-status' : 'hidden'}>
          {type === 'success' ? <SuccessIcon /> : <ErrorIcon /> }
          <p>{message}</p>
        </div>
      );
    }
}

export default DisplayStatus
