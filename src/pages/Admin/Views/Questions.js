import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import { DeleteIconBig, ViewIcon } from '../../../components/icons';


class Questions extends Component {
    render(){
        const {data} = this.props;
        console.log(data);
        
        return(
            <div className="admin-content">
                <div className="messages-top">
                    <p>Dashboard > Site Questions</p>
                </div>
                <div className="users-table-wrap">
                    <div className="filter">
                        <input type="text" placeholder="Filter Table by User Names..." onChange={(e) => this.filterUsers(e.target.value)}/>
                    </div>
                    <table className="table" cellSpacing="0px">
                        <tr className="tr">
                            <th>Index</th>
                            <th>Title</th>
                            <th>Answers</th>
                            <th>Actions</th>
                        </tr>
                        {
                            data.map((profile, index) => {
                                return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{profile.question_title}</td>
                                    <td>{profile.answers.length}</td>
                                    <td>
                                        <Link to={'/question/' + profile.slug} >
                                            <ViewIcon />
                                        </Link>
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

export default Questions