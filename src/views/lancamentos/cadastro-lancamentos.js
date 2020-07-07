import React from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import {withRouter} from "react-router-dom";
import SelectMenu from "../../components/SelectMenu";
import LancamentoService from "../../app/service/LancamentoService";
import LocalStorageService from "../../app/service/localStorageService";
import * as messages from "../../components/toast";

class CadastroLancamentos extends React.Component{

    constructor() {
        super();
        this.lancamentoService = new LancamentoService();
    }

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        // const lancamentoFiltro = {
        //     ano: this.state.ano,
        //     mes: this.state.mes,
        //     tipo: this.state.tipo,
        //     valor: this.state.valor,
        //     descricao: this.state.descricao
        // }

        //Instead of using the way above, I can use the following structure (2 lines below).
        const {descricao, valor, mes, ano, tipo} = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id};

        try{
            this.lancamentoService.validarFormulario(lancamento);
        }catch (erro) {
            const mensagens = erro.mensagens;//erro.mensagens is the this.mensagens from the ErroValidacao() function
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false; //do not execute the rest of this submit() function
        }

        this.lancamentoService.salvar(lancamento)
            .then(response => {
                messages.mensagemSucesso('Lancamento cadastrado com sucesso');
                this.props.history.push('/consulta-lancamentos');
            }).catch(erro => {
                messages.mensagemErro(erro.response.data);
            });
    }

    atualizar = () => {
        const {descricao, valor, mes, ano, tipo, status, id, usuario} = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, status, id, usuario};

        this.lancamentoService.atualizar(lancamento)
            .then(response => {
                messages.mensagemSucesso('Lancamento atualizado com sucesso');
                this.props.history.push('/consulta-lancamentos');
            }).catch(erro => {
            messages.mensagemErro(erro.response.data);
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name] : value});
    }

    cancelar = () => {
        this.props.history.push('/consulta-lancamentos');
    }

    //Will be executed after the render() method
    componentDidMount() {
        const params = this.props.match.params;//getting params passed through Rotas' URL.
        if(params.id){
            this.lancamentoService.lancamentoPorId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizando: true});//Using spread. Update all state attributes through setState() using ...response.data
                }).catch(erro => {
                    messages.mensagemErro(erro.response.data);
                })
        }
    }

    render() {

        const tipos = this.lancamentoService.obterListaTipos();
        const meses = this.lancamentoService.obterListaMeses();

        return (
            <Card title={this.state.atualizando ? 'Atualizacao do Lancamento' : 'Cadastro do Lancamento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descricao: *">
                            <input id="inputDescricao" type="text" className="form-control"
                                    //attribute 'name' has to be the same as event.target.name on handleChange() method. Value "descricao" has to be same as state.descricao
                                    name="descricao"
                                    value={this.state.descricao}
                                    onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control"
                                   name="ano"
                                   value={this.state.ano}
                                   onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mes: *">
                            <SelectMenu id="inputMes" lista={meses} className="form-control"
                                        name="mes"
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" className="form-control"
                                   name="valor"
                                   value={this.state.valor}
                                   onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" lista={tipos} className="form-control"
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            <input id="inputStatus" type="text" className="form-control"
                                   name="status"
                                   value={this.state.status}
                                   disabled
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {/* Using a conditional rendering */}
                        {this.state.atualizando ?
                            (
                                <button onClick={this.atualizar} type="button" className="btn btn-primary"><i className="pi pi-refresh" /> Atualizar</button>
                            ) : (
                                <button onClick={this.submit} type="button" className="btn btn-success"><i className="pi pi-save" /> Salvar</button>
                            )
                        }

                        <button onClick={this.cancelar} type="button" className="btn btn-danger"><i className="pi pi-times" /> Cancelar</button>

                        {/*I could use the format below to cancel the creation of a new Lancamento*/}
                        {/*<button onClick={e => this.props.history.push('/consulta-lancamentos')} type="button" className="btn btn-danger">Cancelar</button>*/}
                    </div>
                </div>
            </Card>
        );
    }

}

export default withRouter(CadastroLancamentos);