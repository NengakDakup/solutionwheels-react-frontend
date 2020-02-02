import React, { Component } from 'react'

class SettingsFilterTabs extends Component {
    render(){
        const {activeTab, setActiveTab} = this.props;

        return (
            <div className="settings-top-tabs">
                <ul>
                    <li onClick={() => setActiveTab('profile')} className={activeTab === 'profile' && 'active-tab'}>Profile</li>
                    <li onClick={() => setActiveTab('notification')} className={activeTab === 'notification' && 'active-tab'}>Notifications</li>
                    <li onClick={() => setActiveTab('security')} className={activeTab === 'security' && 'active-tab'}>Password</li>
                </ul>
            </div>
        )
    }
}

export default SettingsFilterTabs