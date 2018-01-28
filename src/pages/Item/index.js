import React, {Component} from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../actions'

import Header from '../../components/header'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
import MainContent from '../../components/content/MainContent'
import SingleItem from '../../components/content/SingleItem'
import MainContentItem from '../../components/content/MainContentItem'

class Item extends Component{
    render(){
        const {data} = this.props;
        
        
        const {title} = this.props.match.params; 
        return(
            <div className="body">
                <Header data={data} />
                <div className="content">
                    <LeftSide />
                    <div className="main-content">
                        <MainContentItem data={data.feed[0]} displayComments={true} />
                    </div>
                    <RightSide />
                </div>
            </div>
        )
    }
}

//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        data: state 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => { dispatch(logOut(null)) } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)