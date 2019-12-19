import React, { Component } from 'react'
import {connect} from 'react-redux'

class NotifiableCount extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: this.props.data.filter(notification => !notification.seen).length,
            unseen: this.props.data.filter(notification => !notification.seen).length >= 1,
        }

    }

    render(){
        return(
            <div className={this.state.unseen? 'notifiable-count': 'false'}>
                {(this.state.count !== 0) && this.state.count}
            </div>
        )
    }
}

//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        data: state.notifications
    }
}

export default connect(mapStateToProps, null)(NotifiableCount)