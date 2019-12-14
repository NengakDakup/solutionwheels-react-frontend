import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchDropdown extends Component {
    
    container = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);

    }
    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);

    }

    handleClickOutside = (event) => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.props.toggleDropdown('hide')
          }
    }

    render(){
        return (
            <div className="search-dropdown" ref={this.container}>
                <ul>
                    <p><strong>Users</strong></p>
                    {this.props.data.users.length < 1 && <span>No Users Found</span>}
                    {this.props.data.users.map((user,index) => {
                        if (index >= 6) return null;
                        return (
                            <Link to={`/user/${user._id}`} key={index} target="_blank">
                                <li>{user.name}</li>
                            </Link>
                        )
                    })}
                    <p><strong>Questions</strong></p>
                    {this.props.data.questions.length < 1 && <span>No Questions Found</span>}
                    {this.props.data.questions.map((question,index) => {
                        if (index >= 6) return null;
                        return (
                            <Link to={`/question/${question.slug}`} key={index} target="_blank">
                                <li>{question.question_title}</li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default SearchDropdown;