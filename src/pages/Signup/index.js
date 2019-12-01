import React, {Component} from 'react'

import DisplayStatus from '../../components/loaders/DisplayStatus'
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
                    {this.state.msg && <DisplayStatus type="success" message="Account succesfully created! Login to continue" />}
                </div>
            </div>
        )
    }
}

export default SignUp