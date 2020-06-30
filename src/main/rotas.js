import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastro-usuario";
import Home from "../views/home";
import {HashRouter, Route, Switch} from "react-router-dom";

function Rotas() {
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas;