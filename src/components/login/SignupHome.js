import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import validateLoginInput from '../../validation/registerValidator'

import Facebook from '../../assets/icons/facebook.svg'
import Google from '../../assets/icons/google.svg'
import { BtnLoader } from '../icons'

class SignUpHome extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
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

    validateInput(){
        const data = {name: this.state.name, email: this.state.email, password: this.state.password};
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
        axios.post('http://localhost:5000/api/auth/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        .then(data => {
            this.setState({
                errors: {}
            })
            //this.props.logIn(data); //send the action to redux
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
        const { name, password, email } = this.state.errors;
        return (
            <div className="sign-up-home">
                <div className="sign-up-home-top">
                    <h3>SIGN UP HERE</h3>
                    <div className="social-buttons">
                        <span className="sign-with">SIGN UP WITH</span>
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
                    {name && <span className="error-msg">{name}</span>}
                    <input type="text" onChange={(e) => this.updateValue(e, 'name')} placeholder="Full Name" className={ name ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' }/>
                </div>
                <div>
                    {email && <span className="error-msg">{email}</span>}
                    <input type="mail" onChange={(e) => this.updateValue(e, 'email')} placeholder="Email Address" className={ email ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' }/>
                </div>
                <div>
                    {password && <span className="error-msg">{password}</span>}
                    <input type="password" onChange={(e) => this.updateValue(e, 'password')} placeholder="Password" className={ password ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' }/>
                </div>
                <div>
                    <button type="submit" onClick={() => this.validateInput()} value="Sign Up" className="sign-up-home-submit-btn" >
                        {this.state.loading? <BtnLoader /> : 'Sign Up'} 
                    </button>
                </div>
                <p className="already">Already have an Account? <Link to="/login">Log in Here</Link></p>
            </div>
        )
    }
}

export default SignUpHome