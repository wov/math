import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    let mathArray = [];

    this.setTextInputRef = element => {
      this.result = element;
    };
    for(let i=0;i< 20;i++){
      let a = this.getRandomInt(0,30);
      let b = this.getRandomInt(0,a);
      let c = this.getRandomInt(0,1);

      mathArray.push({
        a: a,
        b : b,
        c : c
      })
    }

    this.state = {
      value: null,
      state : 0,
      mathArray : mathArray,
      index : 0,
      score : 0,
      showScore : false
    };
    // this.startGenterMathQuestions();
  }

  getRandomArbitrary(max,min){
    return Math.random() * (max - min) + min;
  }


  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  start(){
    this.setState({
      start : true
    });
    let index = this.state.index;
    if(this.timer){
      clearTimeout(this.timer)
      this.timer = null;
    }

    this.timer = setTimeout( () =>{
      if(index < this.state.mathArray.length - 1){
        index++;
        this.setState({
            index : index
        })
      }else{
        clearTimeout(this.timer)
        this.timer = null;
        this.setState({
          "showScore" : true
        })
      }
    },10000);
  }

  calc(){
    let v = this.result.value;
    let index = this.state.index;
    let s = this.state.mathArray[index];
    let score = this.state.score;


    if( (s.c === 0 && v == (s.a + s.b ) && v!== '' ) || (s.c === 1 && v == (s.a - s.b) ) && v!== '' ){
      score++;
      if(index < this.state.mathArray.length -1 ){
        index++;
        this.setState({
          index : index,
          score : score
        },() => {
          this.result.value = '';
          this.start();
        })
      }else{
        this.setState({
          "showScore" : true,
          score : score
        })
      }
    }else{
      if(index < this.state.mathArray.length -1){
        index++;
        this.setState({
          index : index
        },() => {
          this.result.value = '';
          this.start();
        })
      }else{
        this.setState({
          "showScore" : true
        })
      }
    }
  }

  reload(){
    window.location.reload();
  }

  render() {
    let s = this.state.mathArray[this.state.index];

    console.log(this.state.index);
    return (
      <div className="App">
        <header>Jonan的数学训练</header>

          {s && this.state.start ? [<div className="score" key="score">第{this.state.index+1}/{this.state.mathArray.length}题</div>,<div className="content" key="content">
            <div className="formula">{s.a} {s.c === 0 ?  '+' : null} {s.c === 1 ?  '-' : null} {s.b} = ?</div>
            <div className="answer">
              <input type="tel" ref={this.setTextInputRef}/><button onClick={this.calc.bind(this)}>计算</button>
            </div>
          </div>]:null}

          
          {!this.state.start ? [<div className="start" onClick={this.start.bind(this)} key="start">开始做题</div>,
          <div className="miss" key="miss">错题库</div>] : null }
        
          {this.state.showScore ? <div className="result">本次共做对了{this.state.score}/{this.state.mathArray.length} <br/><button onClick={this.reload.bind(this)}>再来一次</button></div> : null}
          
      </div>
    );
  }
}

export default App;
