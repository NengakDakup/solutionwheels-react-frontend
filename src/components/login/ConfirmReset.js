import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import server from '../../config/config'

import validateResetInput from '../../validation/resetValidator'
import { displayToast } from '../../actions'

import LogoMain from '../../assets/logo-main.png'
import { BtnLoader } from '../icons'

class ConfirmReset extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            pin: '',
            email: this.props.email,
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
        const data = {pin: this.state.pin};
        if(data.pin.length < 4){
            this.setState({
                errors: {
                    pin: 'Pin is 4 Digits'
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
        axios.post(server + '/api/auth/confirm-reset', {
            pin: this.state.pin,
            email: this.state.email
        })
        .then(res => {
            this.setState({
                errors: {}
            })
            this.props.updatePin(this.state.pin);
            this.props.updateStage(3);
            
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
                <p className="reset-text"><span className="or reset-text">Please input the pin sent to {this.state.email}</span></p>
                <form onSubmit={(e) => this.validateInput(e)}>
                    <div>
                        {pin && <span className="error-msg">{pin}</span>}
                        <input type="text" onChange={(e) => this.updateValue(e, 'pin')} placeholder="Input Pin" className={ pin ? 'sign-up-home-full-name input-error' : 'sign-up-home-full-name' } autoComplete/>
                    </div>
                    <div>
                        <button type="submit" onClick={() => this.validateInput()} className={this.state.loading ? "sign-up-home-submit-btn loading-btn" : "sign-up-home-submit-btn" } disabled={this.state.loading} >
                            {this.state.loading? <BtnLoader /> : 'Verify Pin'}
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

export default connect(null, mapDispatchToProps)(ConfirmReset);