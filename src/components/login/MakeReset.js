import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import server from '../../config/config'

import validateResetInput from '../../validation/resetValidator'
import { displayToast } from '../../actions'

import LogoMain from '../../assets/logo-main.png'
import { BtnLoader } from '../icons'

class MakeReset extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            pin: this.props.pin,
            password: '',
            email: this.props.email,
            errors: {},
            success: false
            
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
        const data = {password: this.state.password};
        if(data.password.length < 4){
            this.setState({
                errors: {
                    pin: 'Password cannot be less than 4'
                }
            })
        } else {
            this.sendToBackend();
        }
        
        
    }

    sendToBackend(){
        this.setState({
            loading: true
        });
        axios.post(server + '/api/auth/make-reset', {
            pin: this.state.pin,
            email: this.state.email,
            newPassword: this.state.password
        })
        .then(res => {
            this.setState({
                errors: {},
                success: true
            })

            
        })
        .catch(err => {
            if(err.response) {
                return this.setState({
                    ...this.state,
                    errors: {
                        ...err.response.data
                    }
                })
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
        const { pin } = this.state.errors;
        return (
            <div className="sign-up-home">
                <div className="sign-up-home-top">
                    <Link to="/">
                       <img src={LogoMain} alt="solution wheels" />
                    </Link>
                    <h3>PASSWORD RESET</h3>

                </div>
                <p className="reset-text"><span className="or reset-text">Input Your New Password</span></p>
                {
                    this.state.success && 
                        <div className="success-alert">
                            <span>
                                Password Successfully Changed! <Link to="/login"><strong><u>Login here</u></strong></Link> to continue
                            </span>
                        </div>
                }
                <form onSubmit={(e) => this.validateInput(e)}>
                    <div>
                        {pin && <span className="error-msg">{pin}</span>}
                        <input type="password" onChange={(e) => this.updateValue(e, 'password')} placeholder="Input New Password" className={ pin ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' } autoComplete/>
                    </div>
                    <div>
                        <button type="submit" onClick={() => this.validateInput()} className={this.state.loading ? "sign-up-home-submit-btn loading-btn" : "sign-up-home-submit-btn" } disabled={this.state.loading} >
                            {this.state.loading? <BtnLoader /> : 'Reset Password'}
                        </button>
                    </div>
                </form>
                <p className="already">Remember Your password?<Link to="/login"> Log in Here</Link></p>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayToast: (payload) => { dispatch(displayToast(payload)) }
    }
}

export default connect(null, mapDispatchToProps)(MakeReset);