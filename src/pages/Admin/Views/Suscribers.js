import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import server from '../../../config/config'
import { DeleteIconBig } from '../../../components/icons';

class Suscribers extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            filteredUsers: []
        }

        this.filterUsers = this.filterUsers.bind(this);
    }

    componentWillMount(){
        axios.get(server + '/api/question/reported/all')  
            .then(res => {
                console.log(res);
                
                this.setState({
                    users: res.data,
                    filteredUsers: res.data
                })
            })
    }

    filterUsers(key){
        this.setState({
            filteredUsers: this.state.users.filter(profile => {
                if (profile.user.name.toLowerCase().indexOf(key) !== -1) return profile;
            })
        })
    }

    render(){
        const {filteredUsers} = this.state;
        return(
            <div className="admin-content">
                <div className="messages-top">
                    <p>Dashboard > Site Users</p>
                </div>
                <div className="users-table-wrap">
                    <div className="filter">
                        <input type="text" placeholder="Filter Table by User Names..." onChange={(e) => this.filterUsers(e.target.value)}/>
                    </div>
                    <table className="table" cellSpacing="0px">
                        <tr className="tr">
                            <th>Index</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        {
                            filteredUsers.map((profile, index) => {
                                return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{profile.user.name}</td>
                                    <td>{profile.user.email}</td>
                                    <td>
                                        <button>
                                            <DeleteIconBig />
                                        </button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        
                    </table>
                </div>
            </div>
        )
    }
}

export default Suscribers