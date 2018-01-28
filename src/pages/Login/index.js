import React, {Component} from 'react'

import { connect } from 'react-redux'
import { logIn } from '../../actions'

import LoginMain from '../../components/login/LoginMain'

class Login extends Component {
    logIn = (payload) => {
        this.props.logIn(payload);
    }

    render(){
        return (
            <div className="signup-body">
                {/* <Header data={null} /> */}
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