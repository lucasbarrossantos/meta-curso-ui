import { ITEMS_POR_PAGINA } from '../../constants/paginacao-constant';
import { Moment } from 'moment';

export class TurmaFilter {
    nome?: string;
    nomeCurso?: string;
    status?: number;
    pagina?: number;
    inicioDe?: Moment;
    inicioAte?: Moment;
    terminoDe?: Moment;
    terminoAte?: Moment;
    itensPorPagina = ITEMS_POR_PAGINA;
}
