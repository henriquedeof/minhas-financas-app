import React from 'react';
import Rotas from "./rotas";
import Navbar from "../components/navbar";
import 'toastr/build/toastr.min.js';
import 'bootswatch/dist/flatly/bootstrap.css'; //When importing css I NEED to write the extension. Example: './bootstrap.js'
import '../custom.min.css';
import 'toastr/build/toastr.css';

//import Login from '../views/login'; //When importing JS I do NOT need to write the extension. Example: './views/login.js'
//import CadastroUsuario from "../views/cadastro-usuario";

class App extends React.Component {

  render(){
    return(
      <>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </>
    )
  }

}

export default App;
