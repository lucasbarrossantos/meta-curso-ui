import { ITEMS_POR_PAGINA } from '../../constants/paginacao-constant';

export class ProfessorFilter {
    nome?: string;
    pagina?: number;
    itensPorPagina = ITEMS_POR_PAGINA;
}
