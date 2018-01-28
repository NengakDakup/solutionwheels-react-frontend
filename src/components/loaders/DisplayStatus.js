import React, { Component } from 'react'
import { PulseLoader } from 'react-spinners'

class DisplayStatus extends Component {
    render() {
        return (
            <div className="display-status">
                <PulseLoader color='#fff'/>
            </div>
        )
    }
}

export default DisplayStatus