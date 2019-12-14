import React, {Component} from 'react'

import { connect } from 'react-redux'
import { logIn } from '../../actions'

import LoginMain from '../../components/login/LoginMain'
import DisplayToast from '../../components/loaders/DisplayToast';

class Login extends Component {

    logIn = (payload) => {
        this.props.logIn(payload);
        //set timeout then show a successfully loged in toast
        this.props.history.push('/')
    }

    render(){
        return (
            
            <div className="signup-body">
                { this.props.data.toast.display && <DisplayToast type={this.props.data.toast.type} message={this.props.data.toast.message} /> }
                <div className="signup-wrap">
                    <LoginMain logIn={this.logIn} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (payload) => { dispatch(logIn(payload)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)