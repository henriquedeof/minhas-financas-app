import React from "react";
import UsuarioService from "../app/service/usuarioService";
import {AuthContext} from "../main/ProvedorAutenticacao";

class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor( ) {
        super();//Must use this super() because I extend from React.Component
        this.usuarioService = new UsuarioService();
    }

    //executado depois que o componente eh renderizado no DOM
    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado; //LocalStorageService.obterItem('_usuario_logado');
        console.log('=========== USUARIO LOGADO =========== ', usuarioLogado);

        //Line below I am using "crase". It transformed my String into a String Template (ECMA Script). It helps to concat information in that String
        //Axios.get(`http://localhost:8080/api/usuarios/${usuarioLogado.id}/saldo`)

        this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({saldo: response.data});
            }).catch(error => {
                console.error(error.response);
            });
    }

    render() {
        return (

            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mes atual eh de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="#/cadastro-usuario" role="button">
                            <i className="pi pi-users"></i> Cadastrar Usuario</a>
                        <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos" role="button">
                            <i className="pi pi-money-bill"></i> Cadastrar Lançamento</a>
                    </p>
            </div>

        );
    }

}

Home.contextType = AuthContext;
export default Home;