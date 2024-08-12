import { Card } from "../Card";
import "./tabuleiro.scss"
import React from "react";

type CartaDados = {
    id: number
    conteudo: string,
    cartaVirada: boolean,
}

type TabuleiroProps = {
    baralho: CartaDados[],
    onCardClick: (id:number) => void;
}

export const Tabuleiro: React.FC<TabuleiroProps> = ({ baralho, onCardClick }) => {
    const tamanhoMultiplicador = (baralho.length <= 16 ? 1 
                                  :baralho.length <= 32 ? 2 : 2.6);

                                  
    const tamanhoCartas = {"--tamanho" : 100 /baralho.length * tamanhoMultiplicador} as React.CSSProperties

    return(
        <div className="tabuleiro" style={tamanhoCartas}>
            {baralho.map(b => 
                <Card key={b.id}
                id={b.id}
                conteudo={b.conteudo}
                cartaVirada={b.cartaVirada}
                onCardClick={onCardClick}
                ></Card>
            )}
        </div>
    )
}