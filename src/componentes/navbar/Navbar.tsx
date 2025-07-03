import { type ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }
    
    let component: ReactNode

    if (usuario.token !== "") {

        component = (

            <div className='w-full 
                flex justify-center py-4 mb-20'>

                <div className="container flex justify-between text-lg text-blue-100">
                    <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>

                    <div className='flex gap-4 '>
                        <Link to='/postagens' className='hover:text-blue-400'>POSTAGENS</Link>
                        <Link to='/temas' className='hover:text-blue-400'>TEMAS</Link>
                        <Link to='/perfil' className='hover:text-blue-400'>PERFIL</Link>
                        <Link to='' onClick={logout} className='hover:text-blue-400'>SAIR</Link>
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

export default Navbar