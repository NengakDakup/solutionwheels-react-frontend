import React, {Component} from 'react'
import { connect } from 'react-redux'
import { logOut, loadQuestions } from '../../actions'

import Header from '../../components/header'
import WelcomeDiv from '../../components/welcome'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
import MainContent from '../../components/content/MainContent'
import Meta from '../../components/header/Meta'
import Footer from '../../components/footer'

class Home extends Component {

    logOut = () => {
        localStorage.removeItem('user_token');
        this.props.logOut();
        this.props.history.push('/login');
    }

    loadQuestions = (payload) => {
        this.props.loadQuestions(payload);
    }

    render(){
        const {data} = this.props; 
        
        return(
            <div className="body">
                <Meta 
                    title='Solution Wheels'
                    description='Ask Questions and get wonderful answers...'
                    image={'/test/for/now'}
                    url={`https://solutionwheels.com/`}
                />
                <Header data={data} history={this.props.history} />
                { !data.userDetails.loggedIn && <WelcomeDiv />}
                <div className="content">
                    <LeftSide />
                    <MainContent loadQuestions={this.loadQuestions} />
                    <RightSide />
                </div>
                <Footer />
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
        loadQuestions: (payload) => { dispatch(loadQuestions(payload)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)