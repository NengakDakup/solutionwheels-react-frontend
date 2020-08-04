import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Validator from 'validator'

import server from '../../config/config'

import { BtnLoaderSmallWhite } from '../icons'

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            error: "",
            loading: false
        }
    }

    suscribe(){
        if(!Validator.isEmail(this.state.email) || Validator.isEmpty(this.state.email)) return this.setState({loading: false, error: 'Please enter a valid email address'})
        this.setState({loading: true})
        axios.post(server + '/api/suscribe/add', {
            email: this.state.email
        }).then(res => {
            this.setState({email: "", loading: false, error: ""})
        }).catch(err => {
            if(err.response.data) this.setState({error: err.response.data.error})
            
        }).finally(
            this.setState({loading: false})
        )
    }

    render(){
        return (
            <div className="footer-wrap">
                <div className="footer-section footer-about">
                    <h2>About us</h2>
                    <p>Solutionwheels gives users the opportunity to ask questions which can be answered by all other users therefore opportunity to get robust answers with different analysis which gives the person who asked the question the opportunity to choose from wide a range of answers.</p>
                    <a href="/contact">Contact us</a>
                </div>
                <div className="footer-section footer-suscribe">
                    <h2>Suscribe to Our Newsletter</h2>
                    <p><strong>We Don't send spam mail</strong></p>
                    <p>We will send you a weekly mail of our top questions and answers, and hottest discussions from the site</p>
                    
                    <div className="email-box">
                        <span className="error-msg">{this.state.error}</span>
                        <input value={this.state.email} type="mail" placeholder="Enter your mail" onChange={(e) => this.setState({email: e.target.value})} />
                        <button disabled={this.state.loading} onClick={() => this.suscribe()}>
                            {this.state.loading ? <BtnLoaderSmallWhite /> : 'Suscribe'}
                        </button>
                    </div>
                </div>
                <div className="footer-section footer-links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About us</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact us</Link>
                        </li>
                        <li>
                            <Link to="faq">FAQ</Link>
                        </li>
                    </ul>
                    <div className="social-links">
                        <span>F</span>
                        <span>T</span>
                        <span>I</span>
                        <span>Y</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer