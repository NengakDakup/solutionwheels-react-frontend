import React, { Component } from 'react'

import SignUpHome from '../login/SignupHome'

class WelcomeDiv extends Component {
    render(){
        return (
            <div className="welcome-div">
                <div className="welcome-div-left">
                    <h1>Welcome to Solution Wheels</h1>
                    <p>Solutionwheels gives users the opportunity to ask questions which can be answered by all other users therefore opportunity to get robust answers with different analysis which gives the person who asked the question the opportunity to choose from wide a range of answers.</p>
                </div>
                <div className="welcome-div-right">
                    <SignUpHome />
                </div>
            </div>
        )
    }
}

export default WelcomeDiv