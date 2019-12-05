import React, {Component} from 'react'
import axios from 'axios'

import server from '../../config/config'

import SearchDropdown from '../dropdowns/searchDropdown'
import { SearchIcon } from '../icons'


class HeaderSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayDropdown: false,
            search: '',
            results: {
                users: [],
                questions: []
            }
        }

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }

    toggleDropdown(type){
        if (type === 'hide') {
            this.setState({
                displayDropdown: !this.state.displayDropdown
            })
        } else {
            this.setState({
                displayDropdown: true
            })
        }
    }

    handleChange(event){
        this.toggleDropdown();
        this.setState({
            search: event.target.value
        }, () => this.performSearch())
    }

    performSearch(){
        axios.get(server + '/api/search/' + this.state.search)
            .then(response => {
                this.setState({
                    results: response.data
                })
            })
    }
    render(){
        return(
            <div className="header-search">
                <input onKeyUp={(e) => this.handleChange(e)} onFocus={() => this.toggleDropdown()} type="text" className="main-search" placeholder="Search for a User or a Question"/>
                <button className="main-search-btn">
                  <SearchIcon />
                </button>
                { this.state.displayDropdown && <SearchDropdown data={this.state.results} toggleDropdown={this.toggleDropdown} /> }
            </div>
        )
    }
}

export default HeaderSearch
