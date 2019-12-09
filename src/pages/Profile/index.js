import React, {Component} from 'react'
import { connect } from 'react-redux'
import { logOut, loadQuestions } from '../../actions'

import Header from '../../components/header'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
import MainContent from '../../components/content/MainContent'

import ProfileDetails from '../../components/content/ProfileDetails'

class Profile extends Component {

    render(){
        const {data} = this.props;
        const {id} = this.props.match.params;

        return(
            <div className="body">
                <Header data={data} />
                {/* profile div goes here */}
                <div className="content">
                    <LeftSide />
                    <div className="main-content">
                        <ProfileDetails id={id} />
                        <div class="post-filter profile-filter">
                            <ul>
                                <li class="active-filter">Recent</li>
                                <li>Top</li>
                            </ul>
                        </div>
                        {/* loop through anbd render maincontentitem */}
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
        logOut: () => { dispatch(logOut(null)) },
        loadQuestions: (payload) => { dispatch(loadQuestions(payload)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)