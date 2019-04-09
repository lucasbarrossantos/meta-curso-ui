import { ITEMS_POR_PAGINA } from '../../constants/paginacao-constant';

export class AlunoFilter {
    nome?: string;
    pagina?: number;
    itensPorPagina = ITEMS_POR_PAGINA;
}
