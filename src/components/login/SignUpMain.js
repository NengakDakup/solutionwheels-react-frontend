import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

import { displayToast } from '../../actions'
import server from '../../config/config'
import validateLoginInput from '../../validation/registerValidator'

import LogoMain from '../../assets/logo-main.png'
import Facebook from '../../assets/icons/facebook.svg'
import Google from '../../assets/icons/google.svg'
import { BtnLoader } from '../icons'
import AlertSuccess from '../loaders/AlertSuccess'

class SignUpMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            status: 'pending',
            name: '',
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
        const data = {name: this.state.name, email: this.state.email, password: this.state.password};
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
        axios.post(server + '/api/auth/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        .then(data => {
            this.setState({
                name: '',
                email: '',
                password: '',
                status: 'success',
                errors: {}
            })
        })
        .catch(err => {
            if (err.response) return this.displayError(err.response.data);
            this.props.displayToast({type: 'error', message: 'Network Error'});
        })
        .finally(() => {
            this.setState({
                loading: false
            });
        });

    }

    render(){
        const { name, password, email } = this.state.errors;
        return (
            <div className="sign-up-home">
                <div className="sign-up-home-top">
                    <Link to="/">
                       <img src={LogoMain} alt="solution wheels" />
                    </Link>
                    <h3>SIGN UP HERE</h3>
                    <div className="social-buttons">
                        <span className="sign-with">SIGN UP WITH</span>
                        <a href={server + '/api/auth/facebook'} className="sign-up-facebook">
                            <img src={Facebook} alt="facebook" width="20px" />
                        </a>
                        <a href={server + '/api/auth/google'} className="sign-up-google">
                            <img src={Google} alt="google" width="20px" />
                        </a>
                    </div>

                </div>
                    <p className="seperator"><span className="or">OR</span></p>
                    {this.state.status === 'success' && <AlertSuccess />}
                <form onSubmit={(e) => this.validateInput(e)}>
                    <div>
                        {name && <span className="error-msg">{name}</span>}
                        <input type="text" onChange={(e) => this.updateValue(e, 'name')} placeholder="Full Name" className={ name ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' } autocomplete/>
                    </div>
                    <div>
                        {email && <span className="error-msg">{email}</span>}
                        <input type="email" onChange={(e) => this.updateValue(e, 'email')} placeholder="Email Address" className={ email ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' } autocomplete/>
                    </div>
                    <div>
                        {password && <span className="error-msg">{password}</span>}
                        <input type="password" onChange={(e) => this.updateValue(e, 'password')} placeholder="Password" className={ password ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' } autocomplete/>
                    </div>
                    <div>
                        <button type="submit" onClick={() => this.validateInput()} value="Sign Up" className={this.state.loading ? "sign-up-home-submit-btn loading-btn" : "sign-up-home-submit-btn" } disabled={this.state.loading} >
                            {this.state.loading? <BtnLoader /> : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <p className="already">Already have an Account? <Link to="/login">Log in Here</Link></p>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayToast: (payload) => { dispatch(displayToast(payload)) }
    }
}

export default connect(null, mapDispatchToProps)(SignUpMain);
