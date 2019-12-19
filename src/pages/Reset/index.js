import React, {Component} from 'react'
import SendReset from '../../components/login/SendReset';
import ConfirmReset from '../../components/login/ConfirmReset';
import MakeReset from '../../components/login/MakeReset';

class Reset extends Component{
    constructor(props){
        super(props);
        this.state = {
            stage: 1,
            email: null,
            pin: null,
            msg: ''
        }

        this.updateStage = this.updateStage.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePin = this.updatePin.bind(this);
    }

    updateStage(n){
        this.setState({
            stage: n
        })
    }

    updateEmail(email){
        this.setState({
            email: email
        })
    }

    updatePin(pin){
        this.setState({
            pin: pin
        })
    }

    render(){
        return (
            <div className="signup-body">
                <div className="signup-wrap">
                    {this.state.stage === 1 && <SendReset updateStage={this.updateStage} updateEmail={this.updateEmail} /> }
                    {this.state.stage === 2 && <ConfirmReset email={this.state.email} updateStage={this.updateStage} updatePin={this.updatePin} /> }
                    {this.state.stage === 3 && <MakeReset email={this.state.email} pin={this.state.pin} /> }
                </div>
            </div>
        )
    }
}

export default Reset