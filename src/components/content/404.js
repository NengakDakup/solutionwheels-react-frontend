import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class _404 extends Component{
    render(){
        return(
            <div className="_404-error-wrap">
                <p className="_404-error">ERROR</p>
                <h1 className="_404-error-h1">404</h1>
                <h2 className="_404-page">PAGE NOT FOUND</h2>
                <p className="_404-home">
                    <Link to="/">Go Back Home</Link>
                </p>
             
            </div>
        )
    }
}

export default _404