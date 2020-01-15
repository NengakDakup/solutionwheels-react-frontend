import React, { Component } from 'react'
import axios from 'axios'

import server from '../../config/config'

import SingleAnswer from './SingleAnswer'
import AddAnswer from './AddAnswer'
import { BlueLoader } from '../icons'

//answers loader
//profile loader
class Answers extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            errors: {},
            answers: this.props.data
        }
    }


    render(){
        let localeFeed = this.props.data;
        let newFeed = [];
        if(localeFeed.length < 1) return;
        //loop through each item in the localefeed array
        for (let i = 0; i <= localeFeed.length; i++) {
            //get the element with the highest number of answers
            let max = localeFeed.reduce((cur, prev) => {
                return cur.answer.upvotes.length > prev.answer.upvotes.length? cur : prev;
            });
            //push it to a new array
            
            newFeed.push(max);

            //filter localefeed so the previous max will be removed
            localeFeed = localeFeed.filter((it) => {
                return max._id !== it._id
            })
        }

        const removeIndex = newFeed.map(item => item.answer._id.toString()).indexOf(this.props.bestId);
        let bestAnswer = newFeed[removeIndex];
        if(bestAnswer){
            newFeed.splice(removeIndex, 1);
            newFeed.unshift(bestAnswer);
        }
        
        

        return (
            <div className="answers-wrapper">
                {this.state.loading && <p><BlueLoader /></p>}
                {this.state.errors.noanswers && <p>{this.state.errors.noanswers}</p>}
                {newFeed.map((answer, index) => {
                    return <SingleAnswer 
                                data={answer} 
                                questionOwner={this.props.questionOwner} 
                                questionId={this.props.id} 
                                bestId={this.props.bestId} 
                                key={answer._id + Date.now() + index} 
                                updateData={this.props.updateData}
                                deleteAnswer={this.props.deleteAnswer} />
                })}
            </div>
        )
    }
}

export default Answers