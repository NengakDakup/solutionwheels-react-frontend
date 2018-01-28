import React, {Component} from "react";


class MainContentLoader extends Component {
    render(){
        
        var tweetStyle = {
            position: 'relative',
            display: 'inline-block',
            width: '300px',
            height: '400px',
            margin: '10px'
            };
        return (
            <div className="main-content-skeleton"></div>
        )
    }
}

export default MainContentLoader