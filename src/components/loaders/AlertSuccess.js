import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class AlertSuccess extends Component {
    render(){
        return (
            <div className="success-alert">
                <span>
                    Account succesfully created! <Link to="/login"><strong><u>Login here</u></strong></Link> to continue
                </span>
            </div>
        )
    }
}

export default AlertSuccess