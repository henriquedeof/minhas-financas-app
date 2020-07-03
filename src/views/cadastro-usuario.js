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

        const msgs = this.validar();

        if(msgs && msgs.length > 0){
            msgs.forEach((msg, index) => {
                mensagemErro(msg);
            });
            return false; //Does not execute the rest of the method (method stops here).
        }



        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuario cadastrado com sucesso');
                this.props.history.push('/login');
            }).catch(erro => {
                mensagemErro(erro.response.data);
            })
    }

    validar(){
        const msgs = [];

        if(!this.state.nome){
            msgs.push('O campo Nome eh obrigatorio');
        }

        if(!this.state.email){
            msgs.push('O campo Email eh obrigatorio');
        }else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe Email valido');
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x');
        }else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas nao sao iguais');
        }

        return msgs;
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

                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>

                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(CadastroUsuario);