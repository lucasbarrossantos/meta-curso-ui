import { ITEMS_POR_PAGINA } from '../../constants/paginacao-constant';

export class MaterialFilter {
    nome?: string;
    disponivel?: boolean;
    pagina?: number;
    itensPorPagina = ITEMS_POR_PAGINA;
}
