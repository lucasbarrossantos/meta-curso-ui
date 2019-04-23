import { ITEMS_POR_PAGINA } from '../../constants/paginacao-constant';

export class EmpresaFilter {
    nome?: string;
    pagina?: number;
    itensPorPagina = ITEMS_POR_PAGINA;
}
