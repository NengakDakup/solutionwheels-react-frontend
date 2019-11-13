import React, {Component} from 'react'
import LoginMain from '../../components/login/LoginMain'

class Login extends Component {
    render(){
        return (
            <div className="signup-body">
                {/* <Header data={null} /> */}
                <div className="signup-wrap">
                    <LoginMain />
                </div>
            </div>
        )
    }
}

export default Login