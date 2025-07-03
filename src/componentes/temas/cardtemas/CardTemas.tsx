import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'
import { Pencil, Trash2 } from 'lucide-react'

interface CardTemasProps{
    tema: Tema
}

function CardTemas({ tema }: CardTemasProps) {
    return (
        <div className="w-full bg-blue-100 border border-gray-300 rounded-lg flex items-center justify-between mb-2 shadow-sm px-4 py-2">
            <span className="text-base text-gray-800 flex-grow">{tema.descricao}</span>

            <div className="flex items-center gap-3">
                <Link to={`/editartema/${tema.id}`} className="text-teal-600 hover:text-teal-800">
                <button>
                    <Pencil size={18} />
                </button>
                </Link>

                <Link to={`/deletartema/${tema.id}`} className="text-red-600 hover:text-red-800">
                <button>
                    <Trash2 size={18} />
                </button>
                </Link>
            </div>
        </div>
    )
}

export default CardTemas