import { useContext } from "react"
import ListaPostagens from "../../../componentes/postagens/listapostagens/ListaPostagens"
import ModalPostagem from "../../../componentes/postagens/modalpostagem/ModalPostagem"
import { AuthContext } from "../../../contexts/AuthContext"
import imageHome from "../../imageHome.png";


function Home() {

    const { usuario } = useContext(AuthContext)

    const nome = usuario.nome.trim().toLowerCase();

    const terminaComA = nome.endsWith("a");
    const saudacao = terminaComA ? "Seja Bem-vinda" : "Seja Bem-vindo";

    return (
        <>
            <div className="flex justify-center">
                <div className='container grid grid-cols-2 text-blue-100 mb-10'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className="text-4xl font-bold">
                        {saudacao} {usuario.nome}!
                        </h2>
                        <p className='text-xl'>
                            Expresse aqui seus pensamentos e opniões
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center transform scale-80">
                        <img
                            src={imageHome}
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>

            <ListaPostagens esconderModal />
        </>
    )
}

export default Home