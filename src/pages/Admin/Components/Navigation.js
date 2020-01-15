import React, {Component} from 'react'

class Navigation extends Component {
    render(){
        const {activeTab, setActiveTab} = this.props;
        return(
            <div className="admin-left">
                <ul>
                    <li className={activeTab === 'overview' ? 'active' : 'false'} onClick={() => setActiveTab('overview')}>Overview</li>
                    {/* <li className={activeTab === 'messages' ? 'active' : 'false'} onClick={() => setActiveTab('messages')}>Messages</li> */}
                    <li className={activeTab === 'users' ? 'active' : 'false'} onClick={() => setActiveTab('users')}>Users</li>
                    <li className={activeTab === 'questions' ? 'active' : 'false'} onClick={() => setActiveTab('questions')}>Questions</li>
                    <li className={activeTab === 'reported' ? 'active' : 'false'} onClick={() => setActiveTab('reported')}>Reported</li>
                    {/* <li className={activeTab === 'suscribers' ? 'active' : 'false'} onClick={() => setActiveTab('suscribers')}>Suscribers</li>
                    <li className={activeTab === 'mailing' ? 'active' : 'false'} onClick={() => setActiveTab('mailing')}>Mailing</li> */}
                    <li className={activeTab === 'settings' ? 'active' : 'false'} onClick={() => setActiveTab('settings')}>Settings</li>
                </ul>
            </div>
        )
    }
}

export default Navigation