import React from "react";

import Card from "../components/card";
import FormGroup from "../components/form-group";
import {withRouter} from "react-router-dom";
import UsuarioService from "../app/service/usuarioService";
import {mensagemErro, mensagemSucesso} from '../components/toast';

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
        //console.log(this.state)

        const { nome, email, senha, senhaRepeticao } = this.state;
        const usuario = { nome, email, senha, senhaRepeticao };

        try{
            this.service.validarUsuario(usuario);
        }catch (erro) {
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false; //Do not execute the rest of the code
        }

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuario cadastrado com sucesso');
                this.props.history.push('/login');
            }).catch(erro => {
                mensagemErro(erro.response.data);
            })
    }

    cancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        return(
            <Card title="Cadastro de usuario">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputNome" label="Nome: *">
                                <input type="text" className="form-control" id="inputNome" name="nome"
                                       onChange={e => this.setState({nome: e.target.value})}
                                       aria-describedby="nomeHelp" placeholder="Digite o nome" />
                            </FormGroup>

                            <FormGroup htmlFor="inputEmail" label="Email: *">
                                <input type="email" className="form-control" id="inputEmail"
                                       onChange={e => this.setState({email: e.target.value})}
                                       aria-describedby="emailHelp" placeholder="Digite o Email" />
                                <small id="emailHelp" className="form-text text-muted">Não divulgamos o seu email.</small>
                            </FormGroup>

                            <FormGroup htmlFor="inputSenha" label="Senha: *">
                                <input type="password" className="form-control" id="inputSenha"
                                       onChange={e => this.setState({senha: e.target.value})}
                                       placeholder="Digite o senha" />
                            </FormGroup>

                            <FormGroup htmlFor="inputRepitaSenha" label="Repita a senha: *">
                                <input type="password" className="form-control" id="inputRepitaSenha"
                                       onChange={e => this.setState({senhaRepeticao: e.target.value})}
                                       placeholder="Repita a senha" />
                            </FormGroup>

                            <button onClick={this.cadastrar} type="button" className="btn btn-success"><i className="pi pi-save" /> Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger"><i className="pi pi-times" /> Cancelar</button>

                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(CadastroUsuario);