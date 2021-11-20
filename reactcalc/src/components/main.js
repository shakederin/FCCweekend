import { Component } from "react";
import Button from "./Button";
import Screen from "./Screen";
import Mexp from "math-expression-evaluator";

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state ={
            enterd : 0,
            equation : "",
        }
    }
    clearScreen =() =>{
        this.setState({enterd : 0, equation: "" })
    }

    afterEquals=()=>{
        this.clearScreen();
        this.setState({equation : this.state.enterd})
    }


    numbersClicked =(number) =>{
        if(this.state.enterd === 0 
            || this.state.enterd === "+"
            || this.state.enterd === "-"
            || this.state.enterd === "*"
            || this.state.enterd === "/"
            || this.state.enterd === "="){
                if(this.state.equation === null){
                    this.setState({enterd : number})
                    this.setState({equation : number})
                }else{
                    this.setState({enterd : number})
                    if(this.state.equation === "0"){
                        this.state.equation = String(number)
                    }else{
                    this.setState({equation : this.state.equation + number})
                    }
                }
        }else{
            this.setState({enterd : Mexp.eval(this.state.enterd + number)})
            if(this.state.equation === "0"){
                this.state.equation = String(number)
            }else{
                this.setState((prevState)=>({equation : prevState.equation + number}))
            }
        }
    }
    add = ()=>{
        const currentEquation = this.state.equation;
        this.setState({enterd : "+", equation : currentEquation + "+" });
    }
    subtract = ()=>{
        const currentVal = this.state.equation;
        this.setState({enterd:'-', equation:currentVal + "-"})
    }
    multiply = ()=>{
        const currentVal = this.state.equation;
        this.setState({enterd:'*', equation:currentVal + "*"})
    }
    divide = ()=>{
        const currentVal = this.state.equation;
        this.setState({enterd:'/', equation:currentVal + "/"})
    }
    decimal = ()=>{
        if(String(this.state.enterd).includes(".")){
            return;
        }
        const currentVal = this.state.equation;
        this.setState({enterd: `${this.state.enterd}.` , equation : currentVal + "."})
    }

    equals =()=>{
        if(this.state.equation === null){
            return;
        }
       const equalsResult = Mexp.eval(this.state.equation);
       this.setState({enterd : equalsResult, equation : this.state.equation + "=" + equalsResult});
       
    } 

    renderButton(value, id, method){
        return (
            <Button  value = {value} id = {id} method = {method}/>
        )
    }


    render(){
        return(
            <div>
                <Screen clearState ={this.afterEquals} equation ={this.state.equation} enterd = {this.state.enterd}/>
                <div>
                    {this.renderButton("X", "multiply", this.multiply)}
                    {this.renderButton("/", "divide", this.divide)}
                    {this.renderButton("AC", "clear", this.clearScreen)}
                </div>
                <div>
                    {this.renderButton("7", "seven", this.numbersClicked)}
                    {this.renderButton("8", "eight", this.numbersClicked)}
                    {this.renderButton("9", "nine", this.numbersClicked)}
                    {this.renderButton("-", "subtract", this.subtract)}
                </div>
                <div>
                    {this.renderButton("4", "four", this.numbersClicked)}
                    {this.renderButton("5", "five", this.numbersClicked)}
                    {this.renderButton("6", "six", this.numbersClicked)}
                    {this.renderButton("+", "add", this.add)}
                </div>
                <div>
                    {this.renderButton("1", "one", this.numbersClicked)}
                    {this.renderButton("2", "two", this.numbersClicked)}
                    {this.renderButton("3", "three", this.numbersClicked)}
                </div>
                <div>
                    {this.renderButton("0", "zero", this.numbersClicked)}
                    {this.renderButton(".", "decimal", this.decimal)}
                    {this.renderButton("=", "equals", this.equals)}
                </div>
            </div>
        )
    }
}