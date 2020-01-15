import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

class Meta extends Component {
    render(){
        const {title, description, image, url} = this.props;
        return (
            <Helmet>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={url} />
                <meta name="twitter:card" content="summary_large_image" />

                {/* <!--  Non-Essential, But Recommended --> */}

                <meta property="og:site_name" content="Solution Wheels - Question and Answer" />
                <meta name="twitter:image:alt" content="Solution Wheels" />
                {/* 
                    <!--  Non-Essential, But Required for Analytics -->
                    <meta property="fb:app_id" content="your_app_id" />
                    <meta name="twitter:site" content="@website-username"></meta> 
                */}
            </Helmet>
        )
    }
}

export default Meta