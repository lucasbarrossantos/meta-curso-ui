export class CategoriaEmpresa {
    codigo?: number;
}

export class Empresa {
    codigo?: number;
    nome?: string;
    cnpj?: string;
    endereco?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    uf?: string;
    numero?: string;
    email?: string;
    telefone?: string;
    site?: string;
    celular?: string;
    inscricaoEstadual?: string;
    categoria = new CategoriaEmpresa();
}
