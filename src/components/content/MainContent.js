import React, { Component } from 'react'

import axios from 'axios'
import server from '../../config/config'

import PostFilter from './PostFilter'
import MainContentItem from './MainContentItem'
import MainContentLoader from '../loaders/MainContentLoader';

import {NetworkErrorIcon} from '../icons'

class MainContent extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            networkError: true,
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
            this.setState({
                filteredFeed: [...response.data],
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


        switch (activeCategory) {
            case 'Recent Questions':
                this.setState({
                    filteredFeed: feed
                })
                break;
            case 'No Answers':
                this.setState({
                    filteredFeed: feed.filter((it) => {
                        return it.answers.length === 0
                    })
                })
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
                        return max.id !== it.id
                    })


                }

                this.setState({
                    filteredFeed: newFeed
                })
                break;
            case 'Hottest':
                this.setState({
                    filteredFeed: feed.filter((it) => {
                        return it.answers.length >= 5
                    })
                })
                break;
            default:
                break;
        }


    }


    render(){

        const {activeCategory, filteredFeed} = this.state;
        const items = filteredFeed.map((it, key) => {
            return <MainContentItem data={it} key={key} />
        })

        return (
            <div className="main-content">
                <PostFilter activeCategory={activeCategory} filterCategory={this.filterCategory} />

                <center>
                    {this.state.loading && <MainContentLoader />}
                    {this.state.networkError && <NetworkErrorIcon />}
                </center>

                { items }
            </div>
        )
    }
}

export default MainContent
