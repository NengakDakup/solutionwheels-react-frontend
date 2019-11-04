import React, { Component } from 'react'

class SignUpHome extends Component {
    render(){
        return (
            <div className="sign-up-home">
                <div>
                    <p>Full Name</p>
                    <input type="text" placeholder="Full Name" className="sign-up-home-full-name"/>
                </div>
                <div>
                    <p>Email Address</p>
                    <input type="mail" placeholder="Email Address" className="sign-up-home-full-name"/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" placeholder="Password" className="sign-up-home-full-name"/>
                </div>
                <div>
                    <input type="submit" value="Sign Up" className="sign-up-home-submit-btn" />
                </div>

            </div>
        )
    }
}

export default SignUpHome