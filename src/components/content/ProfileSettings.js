import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import server from '../../config/config'


// import 'bootstrap/dist/css/bootstrap.min.css';

class ProfileSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile: {
                user: {

                },
                image: {

                },
                username: 'nengakdakup',
                bio: 'Web developer with the enthusiasm',
                date_of_birth: '22-02-2000',
                gender: 'Male',
                telephone: '07057325184',
                country: 'Nigeria',
                socials: {
                    facebook: '',
                    twitter: '',
                    instagram: '',
                    linkedin: '',

                }

            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount(){
        this.fetchData();
    }

    fetchData(){
        axios.get(server + '/api/profile')
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleChange(event, type){
        this.setState({
            [type]: event.target.value
        })
    }

    render(){
        console.log(this.props.data)
        return (
            <div className="main-content-item">
                <form>
                    <div className="form-group">
                        <p className="form-group-label">Name:</p>
                        <input className="sign-up-home-full-name input-flex" placeholder="Name" value="Dakup Nengak Wisdom" />
                    </div>
                    <div className="form-group">
                        <p className="form-group-label">Username:</p>
                        <input className="sign-up-home-full-name input-flex" placeholder="Username" value={this.state.username} disabled/>
                    </div>
                    <div className="form-group">
                        <p className="form-group-label">Bio:</p>
                        <textarea className="sign-up-home-full-name" placeholder="A little About you..." max="10" ></textarea>
                    </div>
                    <div className="form-group">
                        <p className="form-group-label">Date Of Birth:</p>
                        <input type="date" className="sign-up-home-full-name input-flex" placeholder="22-02-200" />
                    </div>
                    <div className="form-group">
                        <p className="form-group-label">Gender:</p>
                        <select className="sign-up-home-full-name input-flex">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <p className="form-group-label">Telephone:</p>
                        <input type="number" className="sign-up-home-full-name input-flex" placeholder="Phone Number" />
                    </div>
                    <div className="form-group">
                        <p className="form-group-label">Country:</p>
                        <input className="sign-up-home-full-name input-flex" placeholder="Country" />
                    </div>
                    <div className="form-group">
                        <p className="form-group-label">Facebook:</p>
                        <input type="url" className="sign-up-home-full-name" placeholder="Facebook profile url" />
                    </div>
                    <div className="form-group">
                        <p className="form-group-label">Twitter:</p>
                        <input type="url" className="sign-up-home-full-name" placeholder="Twitter profile url" />
                    </div>
                    <div className="form-group">
                        <p className="form-group-label">Instagram:</p>
                        <input type="url" className="sign-up-home-full-name" placeholder="Instagram profile url" />
                    </div>
                    <div className="form-group">
                        <p className="form-group-label">Linkedin:</p>
                        <input type="url" className="sign-up-home-full-name" placeholder="Linkedin profile url" />
                    </div>
                    <div className="form-group">
                        <button className="ask-question-bottom-submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

//fetch what you want from the store
const mapStateToProps = (state) => {
    return {
        data: state.userDetails 
    }
}

export default connect(mapStateToProps, null)(ProfileSettings)