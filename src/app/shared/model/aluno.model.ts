import { Pessoa } from './pessoa';

export class Aluno extends Pessoa {
    nome_responsavel?: string;
    cpf_responsavel?: string;
    rg_responsavel?: string;
    telefone_responsavel?: string;
    celular_responsavel?: string;
    email_responsavel?: string;
    possui_responsavel?: boolean;
}
