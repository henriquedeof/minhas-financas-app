import React from "react";
import {withRouter} from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/SelectMenu";
import LancamentosTable from "./LancamentosTable";
import LancamentoService from "../../app/service/LancamentoService";
import LocalStorageService from "../../app/service/localStorageService";
import * as messages from "../../components/toast";

import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';

class ConsultaLancamentos extends React.Component{

    constructor() {
        super();
        this.lancamentoService = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    buscar = () =>{
        console.log(this.state);

        if(!this.state.ano){
            messages.mensagemErro("Campo Ano eh obrigatorio.");
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.lancamentoService.consultar(lancamentoFiltro)
            .then(resposta => {
                //console.log(resposta.data);

                const lista = resposta.data;
                if(lista.length < 1){
                    messages.mensagemAlerta("Nenhum resultado encontrado");
                }

                this.setState({lancamentos: lista})
            }).catch(erro => {
                console.log(erro.response);
            });
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`);
    }

    deletar = () => {
        this.lancamentoService.deletar(this.state.lancamentoDeletar.id)
            .then(response => {

                const lancamentos = this.state.lancamentos;//creating a list of lancamentos
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);//knowing the position of the Lancamento I need to delete
                lancamentos.splice(index, 1);//deleting element
                this.setState({lancamentos: lancamentos, showConfirmDialog: false});//updating my Lancamentos and closing Moldal

                messages.mensagemSucesso('Lancamento deletado com sucesso');
            }).catch(erro => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Lancamento');
            });
    }

    abrirCaixaDialogoDeletar = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento});
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}});//Nothing to delete, so, lancamentoDeletar is empty
    }

    confirmDialogFooter = () => {
        return (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary"/>
            </div>
        );
    }

    alterarStatus = (lancamento, status) => {
        this.lancamentoService.alterarStatus(lancamento.id, status)
            .then(response =>{
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamento});//This way is simpler than this.setState({lancamento: lancamento})
                }

                messages.mensagemSucesso('Status atualizado com sucesso');
            }).catch(erro => {
                messages.mensagemErro(erro.response.data);
            })
    }

    preparaFormularioCadastros = () => {
        this.props.history.push('/cadastro-lancamentos');
    }

    render() {

        const meses = this.lancamentoService.obterListaMeses();
        const tipos = this.lancamentoService.obterListaTipos()

        return (
            <Card title="Consulta Lancamentos">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control" id="inputAno"
                                       aria-describedby="anoHelp"
                                       value={this.state.ano}
                                       onChange={e => this.setState({ano: e.target.value})}
                                       placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mes: *">
                                <SelectMenu id="inputMes" className="form-control"
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value})}
                                            lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDescricao" label="Descricao: *">
                                <input type="text" className="form-control" id="inputDescricao"
                                       aria-describedby="descricaoHelp"
                                       value={this.state.descricao}
                                       onChange={e => this.setState({descricao: e.target.value})}
                                       placeholder="Digite o descricao" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo lancamento: *">
                                <SelectMenu id="inputTipo" className="form-control"
                                            value={this.state.tipo}
                                            onChange={e => this.setState({tipo: e.target.value})}
                                            lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success"><i className="pi pi-search" /> Buscar</button>
                            <button onClick={this.preparaFormularioCadastros} type="button" className="btn btn-danger"><i className="pi pi-plus" /> Cadastrar</button>

                        </div>
                    </div>
                </div>

                <br/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable
                                lancamentos={this.state.lancamentos}
                                deleteAction={this.abrirCaixaDialogoDeletar}
                                editAction={this.editar}
                                alterarStatus={this.alterarStatus}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Dialog header="Confirmar delecao"
                            visible={this.state.showConfirmDialog}
                            style={{width: '50vw'}}
                            modal={true}
                            footer={this.confirmDialogFooter()}
                            onHide={() => this.setState({showConfirmDialog: false})}>

                       Deseja realmente excluir este lancamento?
                    </Dialog>
                </div>

            </Card>
        )
    }

}

//Adding router to the component.
//withRouter provides the functionality of going to other views (HTML pages).
export default withRouter(ConsultaLancamentos);