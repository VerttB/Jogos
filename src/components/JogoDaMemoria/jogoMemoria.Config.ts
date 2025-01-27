import { DificuldadeMemoria } from "../../enums/Dificuldade-enum";

const selecionaDificuldade = (dificuldade : string) => {
    switch(dificuldade){
        case "FÁCIL":
            return DificuldadeMemoria.FACIL; 
            
        case "MÉDIO":
            return DificuldadeMemoria.MEDIO;
            
        case "DIFÍCIL":
            return DificuldadeMemoria.DIFICIL;
            
        default:
            return DificuldadeMemoria.MEDIO;
         
}
}

export const geradorDeCarta = (dificuldade: string) => {
    let quantidadeCartas: number = selecionaDificuldade(dificuldade)

    const cartas = []
    for(let i = 0; i < quantidadeCartas;i++){
        for( let j = 1; j<3;j++){
            const carta = {id: 2 * i + j, conteudo: `${String.fromCharCode(i+65)}`, cartaVirada: true}
            cartas.push(carta);
        }
    }

    return cartas;
}