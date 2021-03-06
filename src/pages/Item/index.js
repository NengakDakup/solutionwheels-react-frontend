import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import server from '../../config/config'
import { logOut } from '../../actions'

import Header from '../../components/header'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
import MainContentItem from '../../components/content/MainContentItem'
import MainContentLoader from '../../components/loaders/MainContentLoader'
import Answers from '../../components/content/Answers'
import QuestionNotFound from '../../components/content/QuestionNotFound'
import Meta from '../../components/header/Meta'

class Item extends Component{
    constructor(){
        super()
        this.state = {
            loading: true,
            noquestion: false,
            errors: {},
            question: {}
        }

        this.updateData = this.updateData.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
    }

    componentWillMount(){
        const {data} = this.props;
        const {title} = this.props.match.params;
        if(data.feed.length < 1) {
            axios.get(server + '/api/question/slug/' + title)
                .then(response => {
                    this.setState({
                        question: response.data,
                        loading: false
                    })
                    
                })
                .catch(err => {
                    if(err.response) this.setState({loading: false, noquestion: true })
                })
        } else {
            const item = data.feed.find(question => question.slug === title);
            if(!item) return this.setState({loading: false, noquestion: true })
            this.setState({
                loading: false,
                question: item
            })
        }
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.title !== this.props.match.params.title){
            const {data} = this.props;
            this.setState({
                loading: true,
                question: {}
            })
            const {title} = nextProps.match.params;
            if(data.feed.length < 1) {
                axios.get(server + '/api/question/slug/' + title)
                    .then(response => {
                        this.setState({
                            question: response.data,
                            loading: false
                        })
                        
                    })
                    .catch(err => {
                        if(err.response) this.setState({loading: false, noquestion: true })
                    })
            } else {
                const item = data.feed.find(question => question.slug === title);
                if(item){
                    this.setState({
                    loading: false,
                    question: item
                    })
                } else {
                    this.setState({loading: false, noquestion: true })
                }
            }

        }
    }

    updateData(data){
        this.setState({
            question: data
        })
    }

    deleteAnswer(id){
        const {answers} = this.state.question;
        const newAnswers = [...answers.filter(answer => answer.answer._id !== id)]
        this.setState({
            question: {
                ...this.state.question,
                answers: newAnswers
            }
        })
    }

    render(){ 
        const {data} = this.props;
        const {question} = this.state;
        
        return(
            <div className="body">
                <Meta 
                    title={question.question_title? question.question_title + ' | Solutionwheels' : 'Solutionwheels'}
                    description={question.question_title ? question.question_title : 'Question on Solutionwheels...'}
                    image={'/test/for/now'}
                    url={`https://solutionwheels.com/question/${question.slug}`}
                />
                <Header data={data} />
                <div className="content">
                    <LeftSide />
                    <div className="main-content">
                        {this.state.loading? <MainContentLoader /> : <MainContentItem data={question} updateData={this.updateData}/>}
                        {
                            (!this.state.loading && !this.state.noquestion) && 
                                <Answers
                                    updateData={this.updateData}
                                    deleteAnswer={this.deleteAnswer}
                                    data={question.answers} 
                                    bestId={question.best_answer} 
                                    questionOwner={question.user._id} 
                                    id={question._id} />
                        }
                        {
                            (!this.state.loading && this.state.noquestion) &&
                                <QuestionNotFound />
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
        logOut: () => { dispatch(logOut(null)) } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)