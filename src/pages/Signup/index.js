import React, {Component} from 'react'
import {connect} from 'react-redux'

import SignUpMain from '../../components/login/SignUpMain'
import DisplayToast from '../../components/loaders/DisplayToast';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg: false
        }
        this.redirectToLoginPage = this.redirectToLoginPage.bind(this);
    }

    redirectToLoginPage(){
        //display toast
        setTimeout(() => {
            this.props.history.push('/login');
        }, 3000)
    }
    render(){
        return (            
            <div className="signup-body">
                { this.props.data.toast.display && <DisplayToast type={this.props.data.toast.type} message={this.props.data.toast.message} /> }
                <div className="signup-wrap">
                    <SignUpMain signUp={this.redirectToLoginPage} />
                </div>
            </div>
        )
    }
}

//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps, null)(SignUp);