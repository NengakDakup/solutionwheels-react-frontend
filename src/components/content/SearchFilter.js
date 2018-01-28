import React, { Component } from 'react'

class SearchFilter extends Component {

    
    render(){
        return (
            <div className="post-filter">
                <ul>
                    <li className="active-filter">All</li>
                    <li>Answers</li>
                    <li>Questions</li>
                    <li>Hottest</li>
                </ul>
            </div>
        )
    }
}

export default SearchFilter