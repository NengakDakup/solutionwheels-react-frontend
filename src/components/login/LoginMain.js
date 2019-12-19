import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import server from '../../config/config'
import jwt_decode from 'jwt-decode'
import {connect} from 'react-redux'

import { displayToast } from '../../actions'
import validateLoginInput from '../../validation/loginValidator'

import LogoMain from '../../assets/logo-main.png'
import Facebook from '../../assets/icons/facebook.svg'
import Google from '../../assets/icons/google.svg'
import { BtnLoader } from '../icons'

class LoginMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            email: '',
            password: '',
            errors: {}
        }
        this.updateValue = this.updateValue.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.sendToBackend = this.sendToBackend.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    updateValue(event, type){
        this.setState({
            [type]: event.target.value
        });

    }

    displayError(error){
        this.setState({
            ...error
        })
    }

    validateInput(e){
        if(e) e.preventDefault();
        const data = {email: this.state.email, password: this.state.password};
        const {errors, isValid} = validateLoginInput(data);
        if (!isValid) {
            this.displayError({errors});
        } else {
            this.sendToBackend();
        }
    }

    sendToBackend(){
        this.setState({
            loading: true
        });
        axios.post(server + '/api/auth/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            this.setState({
                errors: {}
            })
            //jwt-decode module to decode the token
            const user = jwt_decode(res.data.token);
            // save the token in the local storage
            localStorage.setItem('user_token', res.data.token);
            this.props.logIn(user); //send the action to redux
        })
        .catch(err => {
            if(err.response) {
                return this.displayError(err.response.data);
            } else {
                this.props.displayToast({type: 'error', message: 'Network Error'});
            }
        })
        .finally(() => {
            this.setState({
                loading: false
            });
        });

    }



    render(){
        const { password, email } = this.state.errors;
        return (
            <div className="sign-up-home">
                <div className="sign-up-home-top">
                    <Link to="/">
                       <img src={LogoMain} alt="solution wheels" />
                    </Link>
                    <h3>LOG IN HERE</h3>
                    <div className="social-buttons">
                        <span className="sign-with">LOG IN WITH</span>
                        <a href={server + '/api/auth/facebook'} className="sign-up-facebook">
                            <img src={Facebook} alt="facebook" width="20px" />
                        </a>
                        <a href={server + '/api/auth/google'} className="sign-up-google">
                            <img src={Google} alt="google" width="20px" />
                        </a>
                    </div>

                </div>
                <p className="seperator"><span className="or">OR</span></p>
                <form onSubmit={(e) => this.validateInput(e)}>
                    <div>
                        {email && <span className="error-msg">{email}</span>}
                        <input type="text" onChange={(e) => this.updateValue(e, 'email')} placeholder="Email Address" className={ email ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' } autocomplete/>
                    </div>
                    <div>
                        {password && <span className="error-msg">{password}</span>}
                        <input type="password" onChange={(e) => this.updateValue(e, 'password')} placeholder="Password" className={ password ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' } autocomplete/>
                    </div>
                    <div>
                        <button type="submit" onClick={() => this.validateInput()} value="Log In" className={this.state.loading ? "sign-up-home-submit-btn loading-btn" : "sign-up-home-submit-btn" } disabled={this.state.loading} >
                            {this.state.loading? <BtnLoader /> : 'Log In'}
                        </button>
                    </div>
                </form>
                <p className="already">Dont have an Account? <Link to="/signup">Sign up Here</Link></p>
                <p className="already">Forgotten Password? <Link to="/reset">Reset Password</Link></p>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayToast: (payload) => { dispatch(displayToast(payload)) }
    }
}

export default connect(null, mapDispatchToProps)(LoginMain);
