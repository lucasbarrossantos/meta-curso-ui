import { Moment } from 'moment';
import { Curso } from './curso.model';

export class Horario {
    codigo?: number;
}

export class Turma {
    codigo?: number;
    nome?: string;
    datainicio?: Moment;
    datatermino?: Moment;
    status?: number;
    curso?: Curso;
    horario = new Horario();
    nvagas?: number;
    vagasdisponiveis?: number;
    turno?: string;
}
