import React, {Component} from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../actions'

import Header from '../../components/header'
import LeftSide from '../../components/content/LeftSide'
import SearchContent from '../../components/content/SearchContent'
import Meta from '../../components/header/Meta'

class Search extends Component{
    render(){
        const {data} = this.props;
        
        const {query} = this.props.match.params; 
        return(
            <div className="body">
                <Header data={data} />
                <Meta 
                    title='Search | Solutionwheels'
                    description='Search for Questions and Users on Solutionwheels'
                    image={'/test/for/now'}
                    url={`https://solutionwheels.com/search`}
                />
                <div className="content">
                    <LeftSide />
                    <SearchContent query={query} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)