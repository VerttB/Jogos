import { Link } from "react-router-dom"
import { jogosPath } from "../../constants/jogosPath/jogosPath"
import  style from './MenuPrincipal.module.scss'
import { Icone } from "../../components/Icone/Icone"

export default function MenuPrincipal(){
    const imagemStartPath = 'src/assets/';
    return(
        <div className={style.menuPrincipal}>
            <h3>Escolha o jogo que deseja jogar</h3>
            <div className={style.jogos}>
            {jogosPath.map(jp => 
                <Link key={jp.nome} to={jp.caminho}>
                    <Icone imagem={imagemStartPath + jp.nome.replace(/\s/g,'') + '.jpg'} titulo={jp.nome}>
                    </Icone>
                </Link>
            )}
            </div>
        </div>
    )
}