import React from "react";
import currencyFormatter from 'currency-formatter';

export default props => {

    const rows = props.lancamentos.map(lancamento => {
       return(
           <tr key={lancamento.id}>
               <td>{lancamento.descricao}</td>
               <td>{ currencyFormatter.format(lancamento.valor, { locale: 'pt-BR'}) }</td>
               <td>{lancamento.tipo}</td>
               <td>{lancamento.mes}</td>
               <td>{lancamento.status}</td>
               <td>
                   {/* Instead of using a title="description" I also can use a tool tip */}
                   <button type="button" className="btn btn-success" title="Efetivar" disabled={lancamento.status !== 'PENDENTE'}
                           onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}><i className="pi pi-check" /></button>
                   <button type="button" className="btn btn-warning" title="Cancelar" disabled={lancamento.status !== 'PENDENTE'}
                           onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}><i className="pi pi-times" /></button>
                   <button type="button" className="btn btn-primary" title="Editar"
                           onClick={e => props.editAction(lancamento.id)}><i className="pi pi-pencil" /></button>
                   <button type="button" className="btn btn-danger" title="Deletar"
                           onClick={e => props.deleteAction(lancamento)}><i className="pi pi-trash" /></button>
               </td>
           </tr>
       )
    });

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descricao</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mes</th>
                    <th scope="col">Situacao</th>
                    <th scope="col">Acoes</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>

        </table>
    )

}