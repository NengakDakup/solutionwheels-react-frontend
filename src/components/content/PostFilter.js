import React, { Component } from 'react'

class PostFilter extends Component {

    
    render(){
        const {activeCategory, filterCategory} = this.props;
        
        return (
            <div className="post-filter">
                <ul>
                    <li onClick={ () => filterCategory('Recent Questions')} className={ activeCategory === 'Recent Questions' ? "active-filter" : null } >Recent Questions</li>
                    <li onClick={ () => filterCategory('No Answers')} className={ activeCategory === 'No Answers' ? "active-filter" : null } >No Answers</li>
                    <li onClick={ () => filterCategory('Most Answers')} className={ activeCategory === 'Most Answers' ? "active-filter" : null } >Most Answers</li>
                    <li onClick={ () => filterCategory('Hottest')} className={ activeCategory === 'Hottest' ? "active-filter" : null } >Hottest</li>
                </ul>
            </div>
        )
    }
}

export default PostFilter