import React, { Component } from 'react'

import SearchContentItem from './SearchContentItem'
import SearchFilter from './SearchFilter'

class SearchContent extends Component {
    constructor(props){
        super(props)
    }

    
    render(){
        const {query} = this.props;
        
        return (
            <div className="main-content">
                <p>Search Results for <strong>"{query}"</strong></p>
                <SearchFilter />
                <p><strong>3</strong> Results Found!</p>
                <SearchContentItem />
                <SearchContentItem />
                <SearchContentItem />
            </div>
        )
    }
}

export default SearchContent