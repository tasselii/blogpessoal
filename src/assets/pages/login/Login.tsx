import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import type UsuarioLogin from '../../../models/UsuarioLogin';
import { AuthContext } from '../../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';
import { EnvelopeSimple, Eye, EyeSlash } from '@phosphor-icons/react'; 
import imageLogin from "../../imageLogin.png";

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const [mostrarSenha, setMostrarSenha] = useState(false); 

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== '') {
      navigate('/home');
    }
  });

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <form
        className="flex justify-center items-center flex-col w-1/2 gap-4"
        onSubmit={login}
      >
        <h2 className="text-white text-5xl">Entrar</h2>

        {/* Email */}
        <div className="flex flex-col w-full" text->
          <label htmlFor="usuario" className="mb-1 text-sm font-medium">
            Usuario
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="exemplo@email.com"
              className="w-full px-4 py-2 bg-gray-100 focus:outline-none text-black font-normal"
              value={usuarioLogin.usuario}
              onChange={(e) => atualizarEstado(e)}
            />
            <div className="bg-blue-600 p-3 flex items-center justify-center">
              <EnvelopeSimple size={20} color="#ffffff" weight="bold" />
            </div>
          </div>
        </div>
        
        {/* Senha */}
        <div className="flex flex-col w-full">
          <label htmlFor="senha" className="mb-1 text-sm font-medium">
            Senha
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
            <input
              type={mostrarSenha ? 'text' : 'password'}  
              id="senha"
              name="senha"
              placeholder="Senha"
              className="w-full px-4 py-2 focus:outline-none text-black font-normal"
              value={usuarioLogin.senha}
              onChange={(e) => atualizarEstado(e)}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="bg-blue-600 p-3 flex items-center justify-center"
              aria-label={mostrarSenha ? 'Esconder senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? (
                <EyeSlash size={20} color="#ffffff" weight="bold" />
              ) : (
                <Eye size={20} color="#ffffff" weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Botão entrar */}
        <button
          type="submit"
          className="rounded bg-blue-600 flex justify-center items-center hover:bg-blue-900 text-white w-1/2 py-2"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>Entrar</span>
          )}
        </button>

        <hr className="border-slate-800 w-full" />

        <p className="text-sm text-white">
          Ainda não tem uma conta?{' '}
          <Link to="/cadastro" className="text-indigo-300 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>

          <div className='w-2/3'>
            <img src={imageLogin}
                 alt="imagem de representação de login" />
          </div>
      
    </div>
  );
}

export default Login;
