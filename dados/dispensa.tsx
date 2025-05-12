interface ItensDispensa {
    id: number;
    nome: string;
}

interface Dispensa {
    id: number;
    nome: string;
    data: ItensDispensa[];
}

const dispensa: Dispensa[] = [
    {
        id: 1,
        nome: "Frios e Laticínios",
        data: [
            { id: 1, nome: "Iogurte" },
            { id: 2, nome: "Leite" },   
            { id: 3, nome: "Queijo" },
        ]
    },
    {
        id: 2,
        nome: "Limpeza",
        data: [
            { id: 4, nome: "Desinfetante" },
            { id: 5, nome: "Detergente" },
            { id: 6, nome: "Sabão em pó" },
        ]
    }
]

export default dispensa;