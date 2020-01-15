import React, {Component} from 'react'

class CountCard extends Component {
    render(){
        return (
            <div className="card">
                <h1>{this.props.count}</h1>
                <p>{this.props.text}</p>
                {this.props.load && <p onClick={() => this.props.setActiveTab(this.props.load)} className="card-link">See all</p>}
            </div>
        )
    }
}

export default CountCard