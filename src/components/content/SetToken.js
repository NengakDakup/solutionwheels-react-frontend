import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import {connect} from 'react-redux'


import {logIn} from '../../actions'

class SetToken extends Component {
    componentWillMount(){
        const {token} = this.props.match.params;
        try {
            const user = jwt_decode(token);
            localStorage.setItem('user_token', token);
            this.props.login(user);
            this.props.history.push('/');
        } catch (error) {
            alert(error);
            this.props.history.push('/login');
        }
    }
    render(){
        return (
            <div>
                Successfull Login, redirecting....
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (payload) => { dispatch(logIn(payload)) }
    }
}

export default connect(null, mapDispatchToProps)(SetToken);