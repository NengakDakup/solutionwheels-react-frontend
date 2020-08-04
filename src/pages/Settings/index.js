import React, {Component} from 'react'
import { connect } from 'react-redux'

import Header from '../../components/header'
import Meta from '../../components/header/Meta'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
import { RandomuserImage } from '../../components/icons'
import SettingsFilterTabs from '../../components/content/SettingsFilterTabs'
import ProfileSettings from '../../components/content/ProfileSettings'
import NotificationSettings from '../../components/content/NotificationSettings'
import SecuritySettings from '../../components/content/SecuritySettings'

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: 'profile'
        }

        this.setActiveTab = this.setActiveTab.bind(this)
    }

    setActiveTab(tab){
        this.setState({
            activeTab: tab
        })
    }

    render(){
        const {data} = this.props;
        const {activeTab} = this.state;
        return (
            <div className="body">
                <Meta 
                    title='Account Settings | Solution Wheels'
                    description='Ask Questions and get wonderful answers...'
                    image={'/test/for/now'}
                    url={`https://solutionwheels.com/settings`}
                />
                <Header data={data} history={this.props.history} />

                <div className="content">
                    <LeftSide />
                    <div className="main-content">
                        <div className="main-content-item profile-content-item">
                            <div className="settings-top">
                                <div className="settings-top-left">
                                    <RandomuserImage />
                                </div>
                                <div>
                                    <h2>Account Settings</h2>
                                    <p>Manage your Profile, Notification and Security settings</p>
                                </div>
                            </div>
                            <SettingsFilterTabs setActiveTab={this.setActiveTab} activeTab={activeTab} />
                        </div>
                        {activeTab === 'profile' && <ProfileSettings /> }
                        {activeTab === 'notification' && <NotificationSettings /> }
                        {activeTab === 'security' && <SecuritySettings /> }
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         logOut: () => { dispatch(logOut(null)) },
//         loadQuestions: (payload) => { dispatch(loadQuestions(payload)) },
//     }
// }

export default connect(mapStateToProps, null)(Settings)