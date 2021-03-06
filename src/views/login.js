import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localStorageService";
import {mensagemErro} from '../components/toast';
import {AuthContext} from "../main/ProvedorAutenticacao";

import {withRouter} from "react-router-dom";

class Login extends React.Component{

    state = {
        email: '',
        senha: ''
        // mensagemErro = null
    }

    constructor( ) {
        super();//Must use this super() because I extend from React.Component
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            console.log(response);//REMOVER
            LocalStorageService.adicionarItem('_usuario_logado', response.data);
            this.context.iniciarSessao(response.data);
            this.props.history.push('/home')
        }).catch(erro => {
            console.log(erro.response);//REMOVER
            mensagemErro(erro.response.data)
            //this.setState({mensagemErro: erro.response.data});
        });
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuario');
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6" style={ {position: 'relative', left: '300px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}
                                                       className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" value={this.state.senha} onChange={e => this.setState({senha: e.target.value})}
                                                       className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={ this.entrar } className="btn btn-success"><i className="pi pi-sign-in" /> Entrar1</button>
                                            <button onClick={this.prepareCadastrar} className="btn btn-danger"><i className="pi pi-plus" /> Cadastrar1</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

}

Login.contextType = AuthContext;
export default withRouter(Login);
