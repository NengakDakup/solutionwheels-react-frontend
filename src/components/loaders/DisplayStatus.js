import React, { Component } from 'react'
import { PulseLoader } from 'react-spinners'

class DisplayStatus extends Component {
    render() {
        return (
            <div class="display-status">
                <PulseLoader color='#fff'/>
            </div>
        )
    }
}

export default DisplayStatus