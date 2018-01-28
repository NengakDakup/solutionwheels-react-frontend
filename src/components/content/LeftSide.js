import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LeftSide extends Component {

    
    render(){
        return (
            <div className="left-side">
                <ul>
                    <li className="is-active">
                        <Link to="">
                            Programming 
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            Security
                        </Link>
                    </li>
                    <li>Educational</li>
                    <li>Business</li>
                    <li>Nature</li>
                    <li>Economy</li>
                    <li>StartUps</li>
                    <li>Investment</li>
                    <li>Trading</li>
                    <li>Bitcoin</li>
                    <li>Forex</li>
                </ul>
            </div>
        )
    }
}

export default LeftSide