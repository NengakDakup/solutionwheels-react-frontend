import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import server from '../../config/config'

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

    validateInput(){
        const data = {email: this.state.email, password: this.state.password};
        const {errors, isValid} = validateLoginInput(data);
        if (!isValid) {
            console.log(errors);
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
            console.log(res.data)
            //jwt-decode module to decode the token
            const user = {
                username: 'Dakup Nengak',

            }
            this.props.logIn(user); //send the action to redux
            localStorage.setItem('user_token', res.data);
            console.log(this.props)
            //this.props.history.push('/');
        }) // set the data to local storage and redux, then load home page
        .catch(err => {
            this.displayError(err.response.data);
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
                        <a href="/" className="sign-up-facebook">
                            <img src={Facebook} alt="facebook" width="20px" />
                        </a>
                        <a href="/" className="sign-up-google">
                            <img src={Google} alt="google" width="20px" />
                        </a>
                    </div>
                    
                </div>
                    <p className="seperator"><span className="or">OR</span></p>
                <div>
                    {email && <span className="error-msg">{email}</span>}
                    <input type="email" onChange={(e) => this.updateValue(e, 'email')} placeholder="Email Address" className={ email ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' }/>
                </div>
                <div>
                    {password && <span className="error-msg">{password}</span>}
                    <input type="password" onChange={(e) => this.updateValue(e, 'password')} placeholder="Password" className={ password ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' }/>
                </div>
                <div>
                    <button type="submit" onClick={() => this.validateInput()} value="Log In" className="sign-up-home-submit-btn" >
                        {this.state.loading? <BtnLoader /> : 'Log In'} 
                    </button>
                </div>
                <p className="already">Dont have an Account? <Link to="/signup">Sign up Here</Link></p>
            </div>
        )
    }
}

export default LoginMain