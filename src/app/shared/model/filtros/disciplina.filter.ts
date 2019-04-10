import { ITEMS_POR_PAGINA } from '../../constants/paginacao-constant';

export class DisciplinaFilter {
    nome?: string;
    status?: string;
    pagina?: number;
    itensPorPagina = ITEMS_POR_PAGINA;
}
