import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import server from '../../config/config'
import { logOut, loadQuestions } from '../../actions'

import Header from '../../components/header'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'

import ProfileDetails from '../../components/content/ProfileDetails'
import MinimizedMainContentItem from '../../components/content/MinimizedMainContentItem'
import Meta from '../../components/header/Meta'

class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            active: '',
            questions: []
        }
    }

    componentWillMount(){
        const {category} = this.props.match.params;
        axios.get(server + '/api/question/category/' + category)
            .then(res => {
                this.setState({
                    questions: res.data
                })
            })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.category !== this.props.match.params.category){
            const {category} = nextProps.match.params;
            axios.get(server + '/api/question/category/' + category)
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
        const {category} = this.props.match.params;
        return(
            <div className="body">
                <Header data={data} />
                <Meta 
                    title={category + ' | Solutionwheels'}
                    description={category + ' questions on solutionwheels...'}
                    image={'/test/for/now'}
                    url={`https://solutionwheels.com/category/${category}`}
                />
                {/* profile div goes here */}
                <div className="content">
                    <LeftSide active={category} />
                    <div className="main-content">
                        {/* <ProfileDetails id={id} currentUser={userId} /> */}
                        <div className="post-filter profile-filter">
                            <ul>
                                <li className="active-filter">{category}</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Category)