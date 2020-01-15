import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import server from '../../config/config'
import { displayToast, deletePost } from '../../actions'
import { BtnLoaderSmall } from '../icons';

class PostDropdown extends Component {
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
        axios.post(server + '/api/question/report/' + id).then(response => {
            this.setState({
                reporting: false
            });
            if(response.status === 200) return this.props.displayToast({type: 'success', message: 'Post Successfully Reported'});
        }).catch(err => {
            this.setState({
                reporting: false
            })
            if(err.response) return this.props.displayToast({type: 'error', message: err.response.data});
            return this.props.displayToast({type: 'error', message: 'Network Error!'});
        })

    }

    deletePost(){
        // eslint-disable-next-line no-restricted-globals
        let confirmed = confirm('Are you sure?\nThis action cannot be undone!');
        if(!confirmed) return;
        this.setState({
            deleting: true
        })
        const { id, deletePost } = this.props;
        axios.delete(server + '/api/question/delete/' + id).then(response => {
            this.setState({
                deleting: false
            });
            deletePost({id})
            if(response.status === 200) return this.props.displayToast({type: 'success', message: 'Post Successfully Deleted'});
        }).catch(err => {
            this.setState({
                deleting: false
            })
            if(err.response) return this.props.displayToast({type: 'error', message: err.response.data.unauthorized});
            return this.props.displayToast({type: 'error', message: 'Network Error!'});
        })
    }

    render(){
        const {loggedIn, userId, status} = this.props.data;
        const {user, deletePost, id } = this.props;
        return (
            <div className="post-dropdown animated linear fadeIn faster" ref={this.container}>
                <ul>
                    <li onClick={() => deletePost({id})} >Hide Post</li>
                    <li onClick={() => this.reportPost()}>
                        <span>
                            Report Post 
                        </span>
                        <span className="loader-right">
                            {this.state.reporting && <BtnLoaderSmall /> } 
                        </span>
                    </li>
                    {
                        (((loggedIn && userId === user) || status === 7)) && 
                            <li>
                                <span>Edit</span>
                            </li>
                    }
                    {
                        (((loggedIn && userId === user) || status === 7)) && 
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDropdown);