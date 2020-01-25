import React, {Component} from 'react'
import { connect } from 'react-redux'

import Header from '../../components/header'
import Meta from '../../components/header/Meta'
import LeftSide from '../../components/content/LeftSide'
import RightSide from '../../components/content/RightSide'

class Settings extends Component {
    render(){
        const {data} = this.props;
        return (
            <div className="body">
                <Meta 
                    title='Settings | Solution Wheels'
                    description='Ask Questions and get wonderful answers...'
                    image={'/test/for/now'}
                    url={`https://solutionwheels.com/settings`}
                />
                <Header data={data} history={this.props.history} />

                <div className="content">
                    <LeftSide />
                    <div className="main-content">
                        <h3>Profile Settings</h3>
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         logOut: () => { dispatch(logOut(null)) },
//         loadQuestions: (payload) => { dispatch(loadQuestions(payload)) },
//     }
// }

export default connect(mapStateToProps, null)(Settings)