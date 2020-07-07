import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastro-usuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import {AuthConsumer} from "../main/ProvedorAutenticacao";

import {HashRouter, Redirect, Route, Switch} from "react-router-dom";


function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props}) {

    return(
        <Route {...props} render={(componentProps) => {
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={{pathname : '/login', state : {from: componentProps.location}}} />
                )
            }
        }} />
    )

}

function Rotas(props) {
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                {/*The question mark after the 'id' property, indicates that 'id' is optional. If id were mandatory, the page would render blank*/}
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

//export default Rotas;
export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
)