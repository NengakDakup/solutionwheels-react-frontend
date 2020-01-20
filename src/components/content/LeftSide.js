import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import server from '../../config/config'

class LeftSide extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            categories: []
        }

        this.fetchData = this.fetchData.bind(this)
    }

    componentWillMount(){
        this.fetchData();
    }

    fetchData(){
        axios.get(server + '/api/category/all')

        
            .then(res => {
                this.setState({
                    loading: false,
                    categories: [...res.data]
                })
            })
    }


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
                    {
                        !this.state.loading && this.state.categories.map((category, index) => {
                        const {title} = category;
                        return (
                            <li className={active === title ? 'is-active' : 'false'} key={index}>
                                <Link to={`/category/${title}`}>
                                    {title[0].toUpperCase() + title.slice(1)}
                                </Link>
                            </li>
                            )
                        })
                    }
                    {/* <li className={active === 'programming' ? 'is-active' : 'false'}>
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
                    </li> */}
                </ul>
            </div>
        )
    }
}

export default LeftSide
