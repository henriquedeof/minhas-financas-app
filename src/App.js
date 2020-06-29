import React from 'react';
import Login from './views/login'; //When importing JS I do NOT need to write the extension. Example: './views/login.js'

import 'bootswatch/dist/flatly/bootstrap.css'; //When importing css I NEED to write the extension. Example: './bootstrap.js'
import './custom.min.css';

class App extends React.Component {

  render(){
    return(
      <div>
        <Login />
      </div>
    )
  }

}

export default App;
