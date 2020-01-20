import React, {Component} from 'react'
import { RetryIcon } from '../icons'

class Retry extends Component {
    render(){
        return (
            <div className="retry-btn" onClick={() => this.props.tryAgain()}>
                <RetryIcon /> 
                <span>Try again</span>
            </div>
        )
    }
}

export default Retry