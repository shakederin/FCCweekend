import { Component } from "react";

export default class Screen extends Component{

    componentDidUpdate(){
        if(String(this.props.equation).includes("=") && this.props.enterd !== 0 ){
            console.log("in if in screen");
            this.props.clearState();
        }
        return
    }

    render(){
        return(
            <div>
                <div>{this.props.equation}</div>
                <div id="display">{this.props.enterd}</div>
            </div>
        )
    }
}