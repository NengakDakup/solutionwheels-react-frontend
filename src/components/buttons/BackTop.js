import React, {Component} from 'react'
import $ from 'jquery'
import { BackTopIcon } from '../icons'

class BackTop extends Component{
    constructor(){
        super();
        this.state = {
            display: false
        }
    }


    render(){
        
        $(window).scroll(function() {
            let height = $(window).scrollTop();
            if (height > 100) {
                $('.back-top-btn').fadeIn();
            } else {
                $('.back-top-btn').fadeOut();
            }
        });

        //back2top
        $(document).ready(function() {
            $(".back-top-btn").click(function(event) {
                event.preventDefault();
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            });

        });
        return(
            <button className="back-top-btn">
                <BackTopIcon />
            </button>
        )
    }
}

export default BackTop
