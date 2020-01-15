import React, { Component } from 'react'

import axios from 'axios'
import server from '../../config/config'
import {connect} from 'react-redux'

import { loadQuestions, recentQuestions, noAnswers, mostAnswers, solvedQuestions } from '../../actions'
import PostFilter from './PostFilter'
import MainContentItem from './MainContentItem'
import MainContentLoader from '../loaders/MainContentLoader';

import {NetworkErrorIcon, DisconnectedIcon} from '../icons'
import Retry from '../buttons/Retry'

class MainContent extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            networkError: false,
            activeCategory: 'Recent Questions',
            filteredFeed: []
        }
        this.filterCategory = this.filterCategory.bind(this)
        this.filterFeed = this.filterFeed.bind(this)
    }

    componentWillMount(){
        axios.get(server + '/api/question')
        .then((response) => {
            this.props.loadQuestions(response.data);
            this.props.recentQuestions(response.data);
            this.setState({
                loading: false,
                networkError: false
            })
        })
        .catch((err) => {
          if(err.toString() === 'Error: Network Error') {
            this.setState({
                networkError: true,
                loading: false
            })
          }
        })
    }

    filterCategory = (category) => {
        this.setState({
            activeCategory: category
        }, () => this.filterFeed() )

    }

    filterFeed = () => {
        const { activeCategory } = this.state;
        const { feed } = this.props.data;
        const { recentQuestions, noAnswers, mostAnswers, solvedQuestions } = this.props;


        switch (activeCategory) {
            case 'Recent Questions':
                recentQuestions(feed);
                break;
            case 'No Answers':
                let filteredFeed = feed.filter((it) => {
                    return it.answers.length === 0
                })
                noAnswers(filteredFeed);
                break;
            case 'Most Answers':
                let localeFeed = feed;
                let newFeed = [];
                if(localeFeed.length < 1) return;
                //loop through each item in the localefeed array
                for (let i = 0; i <= localeFeed.length; i++) {
                    //get the element with the highest number of answers
                    let max = localeFeed.reduce((cur, prev) => cur.answers.length > prev.answers.length? cur : prev);
                    //push it to a new array
                    
                    newFeed.push(max);

                    //filter localefeed so the previous max will be removed
                    localeFeed = localeFeed.filter((it) => {
                        return max._id !== it._id
                    })
                }
                mostAnswers(newFeed);
                break;
            case 'Approved Answers':
                let filtereFeed =  feed.filter((it) => {
                    return it.best_answer !== undefined
                })
                solvedQuestions(filtereFeed);
                break;
            default:
                break;
        }
    }

    render(){
        const {activeCategory} = this.state;
        const { filteredFeed } = this.props.data;
        const items = filteredFeed.map((it, key) => {
            return <MainContentItem data={it} key={it._id + Date.now() + key} />
        })

        return (
            <div className="main-content">
                <PostFilter activeCategory={activeCategory} filterCategory={this.filterCategory} />
                { items }
                <center>
                    {this.state.loading && <MainContentLoader />}
                    {
                        this.state.networkError && 
                        <div className="network-error">
                            <DisconnectedIcon />
                            <p>Looks like you lost your connection</p>
                            <Retry />
                        </div>
                    }
                </center>

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
        loadQuestions: (payload) => { dispatch(loadQuestions(payload)) },
        recentQuestions: (payload) => { dispatch(recentQuestions(payload)) },
        noAnswers: (payload) => { dispatch(noAnswers(payload)) },
        mostAnswers: (payload) => { dispatch(mostAnswers(payload)) },
        solvedQuestions: (payload) => { dispatch(solvedQuestions(payload)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent)
