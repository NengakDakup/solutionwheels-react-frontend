import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import server from '../../config/config'
import { displayToast, deletePost } from '../../actions'
import { BtnLoaderSmall } from '../icons';

class AnswerDropdown extends Component {
    container = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            reporting: false,
            deleting: false
        }

        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.deletePost = this.deletePost.bind(this);
        this.reportPost = this.reportPost.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
      
    }

    handleClickOutside = (event) => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.props.displayPostDropdown()
          }
    }

    reportPost(){
        this.setState({
            reporting: true
        })
        const { id } =this.props;
        axios.post(server + '/api/answer/report/' + id).then(response => {
            this.setState({
                reporting: false
            });
            if(response.status === 200) return this.props.displayToast({type: 'success', message: 'Answer Successfully Reported'});
        }).catch(err => {
            this.setState({
                reporting: false
            })
            if(err.response) return this.props.displayToast({type: 'error', message: err.response.data});
            return this.props.displayToast({type: 'error', message: 'Network Error!'});
        })

    }

    deletePost(){
        this.setState({
            deleting: true
        })
        const { id, deleteAnswer } = this.props;
        
        axios.delete(server + '/api/answer/delete/' + id).then(response => {
            this.setState({
                deleting: false
            });

            deleteAnswer(id);
            if(response.status === 200) return this.props.displayToast({type: 'success', message: 'Answer Successfully Deleted'});
        }).catch(err => {
            this.setState({
                deleting: false
            })
            
            if(err.response) return this.props.displayToast({type: 'error', message: err.response.data.unauthorized});
            return this.props.displayToast({type: 'error', message: 'Network Error!'});
        })
    }

    render(){
        const {loggedIn, userId} = this.props.data;
        const {user, deleteAnswer, id} = this.props;
        
        return (
            <div className="post-dropdown animated linear fadeIn faster" ref={this.container}>
                <ul>
                    <li onClick={() => deleteAnswer(id)} >Hide Answer</li>
                    <li onClick={() => this.reportPost()}>
                        <span>
                            Report 
                        </span>
                        <span className="loader-right">
                            {this.state.reporting && <BtnLoaderSmall /> } 
                        </span>
                    </li>
                    {
                        (loggedIn && userId === user) && 
                            <li>
                                <span>Edit</span>
                            </li>
                    }
                    {
                        (loggedIn && userId === user) && 
                            <li onClick={() => this.deletePost()}>
                                <span>Delete</span>
                                <span className="loader-right">
                                    {this.state.deleting && <BtnLoaderSmall /> } 
                                </span>
                            </li>
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.userDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayToast: (payload) => { dispatch(displayToast(payload)) },
        deletePost: (payload) => { dispatch(deletePost(payload)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerDropdown);