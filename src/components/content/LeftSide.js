import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LeftSide extends Component {


    render(){
        let {active} = this.props;
        if(!active) { active = false }
        return (
            <div className="left-side">
                <ul>
                    <li className={!active || active === 'general' ? 'is-active' : 'false'}>
                      <Link to="/">
                          General
                      </Link>
                    </li>
                    <li className={active === 'programming' ? 'is-active' : 'false'}>
                      <Link to="/category/programming">
                          Programming
                      </Link>
                    </li>
                    <li className={active === 'security' ? 'is-active' : 'false'}>
                      <Link to="/category/security">
                          Security
                      </Link>
                    </li>
                    <li className={active === 'educational' ? 'is-active' : 'false'}>
                        <Link to="/category/educational">
                            Educational
                        </Link>
                    </li>
                    <li className={active === 'business' ? 'is-active' : 'false'}>
                        <Link to="/category/business">
                            Business
                        </Link>
                    </li>
                    <li className={active === 'nature' ? 'is-active' : 'false'}>
                        <Link to="/category/nature">
                            Nature
                        </Link>
                    </li>
                    <li className={active === 'economy' ? 'is-active' : 'false'}>
                        <Link to="/category/economy">
                            Economy
                        </Link>
                    </li>
                    <li className={active === 'startups' ? 'is-active' : 'false'}>
                        <Link to="/category/startups">
                            StartUps
                        </Link>
                    </li>
                    <li className={active === 'football' ? 'is-active' : 'false'}>
                        <Link to="/category/football">
                            Football
                        </Link>
                    </li>
                    <li className={active === 'bitcoin' ? 'is-active' : 'false'}>
                        <Link to="/category/bitcoin">
                            Bitcoin
                        </Link>
                    </li>
                    <li className={active === 'forex' ? 'is-active' : 'false'}>
                        <Link to="/category/forex">
                            Forex
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default LeftSide
