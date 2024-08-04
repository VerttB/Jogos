import { useEffect, useState } from "react";
import { Tabuleiro } from "../Tabuleiro/Tabuleiro"
import "./jogoMemoria.scss"



const geradorDeCarta = () => {
    const cartas = []
    for(let i = 0; i < 6;i++){
        const carta = {id: 2 * i + 1, conteudo: `${String.fromCharCode(i+65)}`, cartaVirada: false}
        const cartaRepetida = {id: 2 * i + 2, conteudo: `${String.fromCharCode(i+65)}`, cartaVirada: false}
        cartas.push(carta);
        cartas.push(cartaRepetida)
    }
    return cartas;
}

const cartasInicio = geradorDeCarta()

const embaralhar =  async (deck: Array<any>): Promise<Array<any>> => {
    const novoDeck = [...deck]
    for (let i = novoDeck.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * i);
        [novoDeck[i], novoDeck[j]] = [novoDeck[j], novoDeck[i]]
    }
    return novoDeck
}


export const JogoMemoria = () => {
    const [baralho, setBaralho] = useState<Array<any>>([])
    const [cartasViradas, setCartasViradas] = useState<Array<number>>([])
    const [cartasAcertadas, setCartasAcertadas] = useState<Array<number>>([])
    const [jogoiniciado, setJogoIniciado] = useState(false);


    
    useEffect(() => {
        const iniciarJogo = async () => {
            const deckEmbaralhado = await embaralhar(cartasInicio);
            setBaralho(deckEmbaralhado);
            setJogoIniciado(true)
           }

        iniciarJogo()

    }, [])

    useEffect(() => {
            fimDeJogo()
    }, [cartasAcertadas, baralho.length])
    
   
       
    const fliparCarta =  async (id?: number, estado?: boolean) => {
        setBaralho(prevBaralho => prevBaralho.map(c => {
            if (cartasAcertadas.includes(c.id)) return c
            if (id !== undefined) return c.id === id ? { ...c, cartaVirada: !c.cartaVirada } : c
            else if (estado !== undefined) return { ...c, cartaVirada: estado }
            return c
        }
        ));
    }

    const resetarJogo = async ()  => {
        await fliparCarta(undefined, false);
        setCartasAcertadas([]);
        setCartasViradas([]);
        const deckEmbaralhado = await embaralhar(cartasInicio)
        setBaralho(deckEmbaralhado)
       
    }

    const fimDeJogo = () : void => {
        if (cartasAcertadas.length === baralho.length && jogoiniciado) {
            console.log("Você ganhou!!!!");
            setTimeout(() => {
                resetarJogo()
            }, 1000)
        }
    };

    const encontrarCarta = (cartaId : number) => {
        return baralho.find(c => c.id === cartaId)
    }

    const onCardClick = (id: number) : void => {

        if (cartasViradas.includes(id) || cartasViradas.length === 2 || cartasAcertadas.includes(id)) {
            return;
        }

        fliparCarta(id);

        const newCartasViradas = [...cartasViradas, id];
        setCartasViradas([...cartasViradas, id]);


        if (newCartasViradas.length === 2) {
            const [primeiraCarta, segundaCarta] = newCartasViradas;
            const primeiraCartaConteudo = encontrarCarta(primeiraCarta).conteudo
            const segundaCartaConteudo = encontrarCarta(segundaCarta).conteudo

            if (primeiraCartaConteudo === segundaCartaConteudo) {

                setCartasAcertadas(() => [...cartasAcertadas, primeiraCarta, segundaCarta]);
            
        }
            else {
                setTimeout(() => fliparCarta(undefined, false), 1000)
            }

            setTimeout(() => setCartasViradas([]), 1000);
        }

    }
    return (
        <div className="jogo-inicio">
            <Tabuleiro onCardClick={onCardClick} baralho={baralho}></Tabuleiro>
        </div>
    )
}