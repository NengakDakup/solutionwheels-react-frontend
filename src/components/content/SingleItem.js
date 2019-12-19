import React, { Component } from 'react'
import MainContentItem from './MainContentItem'

class SingleItem extends Component {
    render(){
        const {avatar, body, date, user} = this.props.comment;
        return (
            <MainContentItem />
        )
    }
}

export default SingleItem