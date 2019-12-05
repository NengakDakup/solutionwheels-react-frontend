import React, {Component} from 'react'

import SignUpMain from '../../components/login/SignUpMain'

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg: false
        }
        this.redirectToLoginPage = this.redirectToLoginPage.bind(this);
    }

    redirectToLoginPage(){
        //show a successfully signed up toast
        this.setState({
            msg: true
        })
        //display toast
        setTimeout(() => {
            this.props.history.push('/login');
        }, 3000)
    }
    render(){
        return (            
            <div className="signup-body">
                <div className="signup-wrap">
                    <SignUpMain signUp={this.redirectToLoginPage} />
                </div>
            </div>
        )
    }
}

export default SignUp