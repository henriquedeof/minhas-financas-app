import React from 'react';

class App extends React.Component {

  state = {
    numero1: null,
    numero2: null,
    resultado: null
  }

  somar = () => {
    const resultado = parseInt(this.state.numero1) + parseInt(this.state.numero2);
    this.setState({resultado: resultado})
  }

  render(){
    return(
      <div>
        <label>Primeiro numero: </label>
        <input type="text" value={this.state.numero1} onChange={(e) => this.setState({numero1: e.target.value})} />
        <br />

        <label>Segundo numero: </label>
        <input type="text" value={this.state.numero2} onChange={(e) => this.setState({numero2: e.target.value})} />
        <br />

        <button onClick={() => this.somar}>
          somar
        </button>
        <br />
        
        Resultado eh: {this.state.resultado}
      </div>
    )   //I am changing my state when I use this.setState()
  }


}

export default App;
