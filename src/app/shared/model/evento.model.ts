import { Moment } from 'moment';
export class Evento {
    codigo?: number;
    descricao?: string;
    dataInicio?: Moment;
    horarioInicio?: Moment;
    observacao?: string;
}
