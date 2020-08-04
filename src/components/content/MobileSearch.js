import React, { Component } from 'react'
import { SearchIcon, CloseBtn } from '../icons'
import axios from 'axios'
import { Link } from 'react-router-dom'

import server from '../../config/config'

class MobileSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            error: null,
            results: {
                users: [],
                questions: []
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }

    handleChange(event){
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
        const {users, questions} = this.state.results;
        return (
            <div className="mobile-search">
                <div className="mobile-search-top">
                    <SearchIcon />
                    <input type="text" onChange={(e) => this.handleChange(e)} autoFocus={true} placeholder="Type to search..." />
                    <button onClick={() => this.props.hideMobileSearch()}>
                        <CloseBtn />
                    </button>
                </div>
                <div className="search-content">
                    <ul>
                        <p><strong>Users</strong></p>
                        {users.length < 1 && <span>No Users Found</span>}
                        {users.map((user,index) => {
                            if (index >= 6) return null;
                            return (
                                <Link to={`/user/${user._id}`} onClick={() => this.props.hideMobileSearch()} key={index} >
                                    <li>{user.name}</li>
                                </Link>
                            )
                        })}
                        <p><strong>Questions</strong></p>
                        {(!this.props.loading && questions.length < 1) && <span>No Questions Found</span>}
                        {questions.map((question,index) => {
                            if (index >= 6) return null;
                            return (
                                <Link to={`/question/${question.slug}`} onClick={() => this.props.hideMobileSearch()} key={index} >
                                    <li>{question.question_title}</li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default MobileSearch