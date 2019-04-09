import { Pessoa } from './pessoa';

export class Professor extends Pessoa {
    disciplinas_atuacao?: string;
    escolaridade?: string;
    filhos_zero_sete?: number;
    filhos_sete_treze?: number;

    // Dados bancarios
    nome_banco?: string;
    agencia?: string;
    conta?: string;
    operacao?: string;

    // Dados de contratação
    forma_contratacao?: string;
}
