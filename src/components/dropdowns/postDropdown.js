import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import server from '../../config/config'
import { displayToast } from '../../actions'
import { BtnLoaderSmall } from '../icons';

class PostDropdown extends Component {
    container = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            reporting: false
        }

        this.handleClickOutside = this.handleClickOutside.bind(this)
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
            return this.props.displayToast({type: 'error', message: err});
        })

    }

    render(){
        return (
            <div className="post-dropdown animated linear fadeIn faster" ref={this.container}>
                <ul>
                    <li>Delete Post</li>
                    <li onClick={() => this.reportPost()}>
                        <span>
                            Report Post 
                        </span>
                        <span className="loader-right">
                            {this.state.reporting && <BtnLoaderSmall /> } 
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayToast: (payload) => { dispatch(displayToast(payload)) }
    }
}

export default connect(null, mapDispatchToProps)(PostDropdown);