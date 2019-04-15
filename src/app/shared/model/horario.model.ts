import { Moment } from 'moment';
import { Professor } from './professor.model';
import { Turma } from './turma.model';
import { Disciplina } from './disciplina.model';

export class Horario {
    codigo?: number;
    turma?: Turma;
    disciplina = new Disciplina();
    professor = new Professor();
    dia?: number;
    inicio?: string;
    fim?: string;
    dia_extenso?: string;
    matricula?: {};
    valor_disciplina?: number;
    dataAula?: Moment;
}
