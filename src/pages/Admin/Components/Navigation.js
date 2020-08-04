import React, {Component} from 'react'

class Navigation extends Component {
    render(){
        const {activeTab, setActiveTab, toggleSideBar} = this.props;
        
        const handleClick = (tab) => {
            setActiveTab(tab);
            toggleSideBar();
        }
        
        return(
            <div className="admin-left">
                <ul>
                    <li className={activeTab === 'overview' ? 'active' : 'false'} onClick={() => handleClick('overview')}>Overview</li>
                    {/* <li className={activeTab === 'messages' ? 'active' : 'false'} onClick={() => handleClick('messages')}>Messages</li> */}
                    <li className={activeTab === 'users' ? 'active' : 'false'} onClick={() => handleClick('users')}>Users</li>
                    <li className={activeTab === 'questions' ? 'active' : 'false'} onClick={() => handleClick('questions')}>Questions</li>
                    <li className={activeTab === 'reported' ? 'active' : 'false'} onClick={() => handleClick('reported')}>Reported</li>
                    {/* <li className={activeTab === 'suscribers' ? 'active' : 'false'} onClick={() => handleClick('suscribers')}>Suscribers</li>
                    <li className={activeTab === 'mailing' ? 'active' : 'false'} onClick={() => handleClick('mailing')}>Mailing</li> */}
                    <li className={activeTab === 'settings' ? 'active' : 'false'} onClick={() => handleClick('settings')}>Settings</li>
                </ul>
            </div>
        )
    }
}

export default Navigation