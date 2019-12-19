import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import server from '../../config/config'

import validateResetInput from '../../validation/resetValidator'
import { displayToast } from '../../actions'

import LogoMain from '../../assets/logo-main.png'
import { BtnLoader } from '../icons'

class SendReset extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            email: '',
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
        const data = {email: this.state.email};
        const {errors, isValid} = validateResetInput(data);
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
        axios.post(server + '/api/auth/send-reset', {
            email: this.state.email
        })
        .then(res => {
            this.setState({
                errors: {}
            })
            this.props.updateEmail(this.state.email);
            this.props.updateStage(2);
            
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
        const { email, nouser } = this.state.errors;
        return (
            <div className="sign-up-home">
                <div className="sign-up-home-top">
                    <Link to="/">
                       <img src={LogoMain} alt="solution wheels" />
                    </Link>
                    <h3>PASSWORD RESET</h3>

                </div>
                <p className="reset-text"><span className="or reset-text">Please input the email address associated with your account</span></p>
                <form onSubmit={(e) => this.validateInput(e)}>
                    <div>
                        {email && <span className="error-msg">{email}</span>}
                        {nouser && <span className="error-msg">{nouser}</span>}
                        <input type="text" onChange={(e) => this.updateValue(e, 'email')} placeholder="Email Address" className={ email ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' } autoComplete/>
                    </div>
                    <div>
                        <button type="submit" onClick={() => this.validateInput()} value="Log In" className={this.state.loading ? "sign-up-home-submit-btn loading-btn" : "sign-up-home-submit-btn" } disabled={this.state.loading}>
                            {this.state.loading? <BtnLoader /> : 'Verify Account'}
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

export default connect(null, mapDispatchToProps)(SendReset);