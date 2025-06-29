import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import {  type ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    if (usuario.token !== "") {

        component = (
            <div className="flex justify-center text-white bg-slate-800">
                <div className="container flex flex-col items-center py-4">
                    <p className="text-ml font-bold">© 2025 Thiago Tasseli. This site is <a className="underline hover:text-blue-800 " href="https://github.com/tasselii" target="_blank">open source</a>!</p>
                    <p className="text-lg">Acesse as redes sociais</p>
                    <div className="flex gap-2">
                        <a href="" target="_blank" className="hover:text-blue-600 transform hover:scale-110 transition-transform duration-300">
                            <LinkedinLogo size={48} weight="bold" />
                        </a>
                       <a href="https://github.com/tasselii" target="_blank" rel="noopener noreferrer" className="hover:text-black transform hover:scale-105 transition-transform duration-300">
                       <GithubLogo size={40} weight="bold" className="border-5 m-1 rounded" />
                       </a>
                        
                    </div>
                </div>
            </div>
    )
    }
    return (
        <>
            { component }
        </>
    )
}

export default Footer