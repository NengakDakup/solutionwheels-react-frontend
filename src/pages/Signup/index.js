import React, {Component} from 'react'
import SignUpHome from '../../components/login/SignupHome'
import Header from '../../components/header'

class SignUp extends Component {
    render(){
        return (
            
            <div className="signup-body">
                {/* <Header data={null} /> */}
                <div className="signup-wrap">
                    <SignUpHome />
                </div>
            </div>
        )
    }
}

export default SignUp