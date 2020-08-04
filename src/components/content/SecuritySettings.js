import React, { Component } from 'react'

class SecuritySettings extends Component {
    render(){
        return (
            <div className="main-content-item">
                <p>Security Settings</p>
                <p>Reset your default password here</p>
                <div className="form-group">
                    <p>Old password</p>
                    <input type="password" />
                </div>
                <div>
                    <p>New password</p>
                </div>
            </div>
        )
    }
}

export default SecuritySettings