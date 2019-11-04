import React, {Component} from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../actions/logOutAction'

import Header from '../../components/header'
import WelcomeDiv from '../../components/welcome'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
import MainContent from '../../components/content/MainContent'

class Home extends Component {

    logOut = () => {
        this.props.logOut();
    }

    render(){
        const {data} = this.props; 
        return(
            <div className="body">
                <Header data={data} />
                <WelcomeDiv />
                <div className="content">
                    <LeftSide />
                    <MainContent />
                    <RightSide />
                </div>
                <button onClick={this.logOut}>logout</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)