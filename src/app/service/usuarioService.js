import Apiservice from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends Apiservice{

    constructor() {
        super('/api/usuarios');
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais);
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario){
        return this.post('/', usuario)
    }

    validarUsuario(usuario){
        const erros = [];

        if(!usuario.nome){
            erros.push('O campo Nome eh obrigatorio');
        }

        if(!usuario.email){
            erros.push('O campo Email eh obrigatorio');
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe Email valido');
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2x');
        }else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push('As senhas nao sao iguais');
        }

        if (erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

}

export default UsuarioService;