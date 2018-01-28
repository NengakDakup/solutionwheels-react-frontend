import React, { Component } from 'react'
import { FacebookIcon, GoogleIcon } from '../icons'
import { Link } from 'react-router-dom'

import Facebook from '../../assets/icons/facebook.svg'
import Google from '../../assets/icons/google.svg'

class SignUpHome extends Component {
    render(){
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
                    <input type="text" placeholder="Full Name" className="sign-up-home-full-name"/>
                </div>
                <div>
                    <input type="mail" placeholder="Email Address" className="sign-up-home-full-name"/>
                </div>
                <div>
                    <input type="password" placeholder="Password" className="sign-up-home-full-name"/>
                </div>
                <div>
                    <input type="submit" value="Sign Up" className="sign-up-home-submit-btn" />
                </div>
                <p className="already">Already have an Account? <Link to="/login">Sign in Here</Link></p>
            </div>
        )
    }
}

export default SignUpHome