import React, {Component} from 'react'
import SignUpHome from '../../components/login/SignupHome'

class Login extends Component {
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

export default Login