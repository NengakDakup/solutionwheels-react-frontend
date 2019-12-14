import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import server from '../../config/config'
import {displayToast} from '../../actions'

import SearchDropdown from '../dropdowns/searchDropdown'
import { SearchIcon } from '../icons'


class HeaderSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayDropdown: false,
            search: '',
            error: null,
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
            }).catch(err => {
                if(err.response) return null;
                this.props.displayToast({type: 'error', message: 'Network Error'});
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

const mapDispatchToProps = (dispatch) => {
    return {
        displayToast: (payload) => { dispatch(displayToast(payload)) }
    }
}

export default connect(null, mapDispatchToProps)(HeaderSearch) 
