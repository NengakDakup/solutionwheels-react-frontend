import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import PostFilter from './PostFilter'
import MainContentItem from './MainContentItem'

class MainContent extends Component {

    
    render(){
        return (
            <div className="main-content">
                <PostFilter />
                <MainContentItem />
                <MainContentItem />
                <MainContentItem />
                <MainContentItem />
                <MainContentItem />
                <MainContentItem />
                <MainContentItem />
                this is the left side
            </div>
        )
    }
}

export default MainContent