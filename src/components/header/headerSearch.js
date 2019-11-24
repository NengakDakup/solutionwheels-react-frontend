import React, {Component} from 'react'
import { SearchIcon } from '../icons'


class HeaderSearch extends Component {
    render(){
        return(
            <div className="header-search">
                <input type="Text" className="main-search" placeholder="Search for a User or a Question"/>
                <button className="main-search-btn">
                  <SearchIcon />
                </button>
            </div>
        )
    }
}

export default HeaderSearch
