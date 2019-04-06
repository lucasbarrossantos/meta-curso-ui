import { ITEMS_POR_PAGINA } from '../../constants/paginacao-constant';

export class CursoFilter {
    nome?: string;
    pagina?: number;
    itensPorPagina = ITEMS_POR_PAGINA;
}
