import Apiservice from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

export default class LancamentoService extends Apiservice{

    constructor() {
        super('/api/lancamentos');
    }

    obterListaMeses(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Marco', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12}
        ];
    }

    obterListaTipos(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'}
        ];
    }

    //this method calls the listarLancamento() on the backend.
    consultar(lancamentoFiltro){

    // @RequestParam(value = "descricao", required = false) String descricao,
    //     @RequestParam(value = "mes", required = false) Integer mes,
    //     @RequestParam(value = "ano", required = false) Integer ano,
    //     @RequestParam("usuario") Long idUsuario //idUsuario is mandatory

        //The difference between const and let is that with let I can modify its value if necessary. Const is equal to constant, which I do not change its value.
        let params = `?ano=${lancamentoFiltro.ano}`;

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`;
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`;
        }

        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`;
        }

        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`;
        }

        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`;
        }

        return this.get(params);
    }

    validarFormulario(lancamento){
        const erros = [];

        if(!lancamento.ano){
            erros.push("Informe o Ano.")
        }

        if(!lancamento.mes){
            erros.push("Informe o Mês.")
        }

        if(!lancamento.descricao){
            erros.push("Informe a Descrição.")
        }

        if(!lancamento.valor){
            erros.push("Informe o Valor.")
        }

        if(!lancamento.tipo){
            erros.push("Informe o Tipo.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }

    }

    deletar(id){
        return this.delete(`/${id}`);
    }

    salvar(lancamento){
        return this.post('/', lancamento);
    }

    lancamentoPorId(id){
        return this.get(`/${id}`);
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, {status});
    }

}