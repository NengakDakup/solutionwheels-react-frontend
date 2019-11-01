import React, {Component} from 'react'


class HeaderSearch extends Component {
    render(){
        return(
            <div>
                <input type="Text" className="main-search" placeholder="Search for a User, Tag, Or a Question"/>
                <button className="main-search-btn">Search</button>
            </div>
        )
    }
}

export default HeaderSearch