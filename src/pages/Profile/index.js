import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import server from '../../config/config'
import { logOut, loadQuestions } from '../../actions'

import Header from '../../components/header'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
import MainContentItem from '../../components/content/MainContentItem'

import ProfileDetails from '../../components/content/ProfileDetails'
import MinimizedMainContentItem from '../../components/content/MinimizedMainContentItem'

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            loading: true,
            questions: []
        }
    }

    componentWillMount(){
        const {id} = this.props.match.params;
        axios.get(server + '/api/question/for/' + id)
            .then(res => {
                this.setState({
                    questions: res.data
                })
            })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id !== this.props.match.params.id){
            this.setState({
                id: nextProps.match.params.id,
                loading: true,
                questions: []
            })
            const {id} = nextProps.match.params;
            axios.get(server + '/api/question/for/' + id)
            .then(res => {
                this.setState({
                    questions: res.data
                })
            })

        }
    }

    render(){
        const {data} = this.props;
        const {userId} = data.userDetails;

        return(
            <div className="body">
                <Header data={data} />
                {/* profile div goes here */}
                <div className="content">
                    <LeftSide />
                    <div className="main-content">
                        <ProfileDetails id={this.state.id} currentUser={userId} />
                        <div className="post-filter profile-filter">
                            <ul>
                                <li className="active-filter">User Questions</li>
                            </ul>
                        </div>
                        {
                            this.state.questions.length >= 1 && this.state.questions.map((question, key) => {
                                return <MinimizedMainContentItem data={question} key={question._id + Date.now() + key} />
                            })
                        }
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

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => { dispatch(logOut(null)) },
        loadQuestions: (payload) => { dispatch(loadQuestions(payload)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)