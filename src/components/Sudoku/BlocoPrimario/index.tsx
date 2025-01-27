import style from './BlocoPrimario.module.scss'
import { BlocoSecundario } from '../BlocoSecundario'

interface BlocoPrimarioProps{
    valores : Array<number>
}

export const BlocoPrimario = ({valores}:BlocoPrimarioProps ) => {
    const blocosSecundario = Array(9).fill('');
    return(
        <div className={style.blocoPrimario}>
            {blocosSecundario.map((_,i) => <BlocoSecundario key={i} 
                                valor={valores[i]} ></BlocoSecundario>)}
        </div>
    )
}