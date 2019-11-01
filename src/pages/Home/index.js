import React, {Component} from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../actions/logOutAction'

import Header from '../../components/header'

class Home extends Component {

    logOut = () => {
        this.props.logOut();
    }

    render(){
        const {data} = this.props; 
        return(
            <div className="body">
                <Header data={data} />
                <button onClick={this.logOut}>logout</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)