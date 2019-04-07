import { Moment } from 'moment';
import { Endereco } from './Endereco';

export class Pessoa extends Endereco {
    codigo?: number;
    nome?: string;
    cpf?: string;
    datanascimento?: Moment;
    estado_civil?: number;
    rg?: string;
    orgao_expedidor_rg?: string;
    uf_rg?: string;
    titulo_eleitor?: string;
    pis_cartao_cidadao?: string;
    tipo?: number;
    genero?: string;
    // Dados de contato
    email?: string;
    telefone?: string;
    celular?: string;
}
