import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className=
        " font-inter mb- ml-[30%] rounded-lg transition duration-10 ease-in-out transform hover:scale-101 "
        >

            <Link to={`/postagem/${postagem.id}`} className="block cursor-pointer">
                <div className="mb-0.5">
                    <h2 className=
                        'text-2xl font-extrabold text-blue-400 mb-0 w-full'
                    >
                        {postagem.titulo}
                    </h2>
                </div>
                <p className=
                        'text-slate-400 text-sm'
                    >
                        {new Intl.DateTimeFormat('pt-BR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }).format(new Date(postagem.data))}
                    </p>
               <p className=
                    ' text-slate-400 text-sm font-normal mt-0.5'
                >
                    {postagem.tema?.descricao}
                </p> 
            </Link>
        </div>
    )
}

export default CardPostagem

