
class Categoria {
    codigo?: number;
}

export class Curso {
  codigo?: number;
  nome?: string;
  descricao?: string;
  categoria?: Categoria;
  disciplinas?: null;
  materiais?: null;
  disciplinaId?: number;
  materialId?: number;
  observacoes?: string;
  // tslint:disable-next-line:variable-name
  taxa_matricula?: number;
  // tslint:disable-next-line:variable-name
  total_material?: number;
  valorCurso?: number;
  status?: number;
}
