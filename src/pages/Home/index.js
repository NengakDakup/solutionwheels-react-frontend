import React, {Component} from 'react'
import { connect } from 'react-redux'
import { logOut, loadQuestions } from '../../actions'

import Header from '../../components/header'
import WelcomeDiv from '../../components/welcome'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
import MainContent from '../../components/content/MainContent'

class Home extends Component {

    logOut = () => {
        this.props.logOut();
    }

    loadQuestions = (payload) => {
        this.props.loadQuestions(payload);
    }

    render(){
        const {data} = this.props; 
        
        return(
            <div className="body">
                <Header data={data} />
                <WelcomeDiv />
                <div className="content">
                    <LeftSide />
                    <MainContent data={data} loadQuestions={this.loadQuestions} />
                    <RightSide />
                </div>
                <button onClick={this.logOut}>logout</button>
                <button onClick={ () => this.loadQuestions(data.feed)}>loadQuestions</button>
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
        logOut: () => { dispatch(logOut(null)) },
        loadQuestions: (payload) => { dispatch(loadQuestions(payload)) } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)