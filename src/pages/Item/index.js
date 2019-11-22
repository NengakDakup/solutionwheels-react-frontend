import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import server from '../../config/config'
import { logOut } from '../../actions'

import Header from '../../components/header'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'
// import MainContent from '../../components/content/MainContent'
// import SingleItem from '../../components/content/SingleItem'
import MainContentItem from '../../components/content/MainContentItem'

class Item extends Component{
    constructor(){
        super()
        this.state = {
            loading: true,
            question: []
        }
    }

    componentWillMount(){
        const {data} = this.props;
        const {title} = this.props.match.params;
        if(data.feed.length < 1) {
            axios.get(server + '/api/question/slug/' + title)
                .then(response => {
                    this.setState({
                        loading: false,
                        question: response.data
                    })
                })
                .catch(err => console.log(err))
        } else {
            const item = data.feed.find(question => question.slug === title);
            this.setState({
                loading: false,
                question: item
            })
        }
        
    }

    render(){ 
        const {data} = this.props;
        const {question} = this.state;
        return(
            <div className="body">
                <Header data={data} />
                <div className="content">
                    <LeftSide />
                    <div className="main-content">
                        {this.state.loading? 'Loading...' : <MainContentItem data={question} displayComments={true} />}
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