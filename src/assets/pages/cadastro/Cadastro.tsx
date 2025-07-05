import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import "./Cadastro.css";
import type Usuario from "../../../models/Usuario";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { Camera, Eye, Key, User } from "lucide-react";
import { EnvelopeSimple, EyeSlash } from "@phosphor-icons/react";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();

  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha == usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!", 'sucesso');
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário", 'erro');
        console.error(error);
      }
    } else {
      ToastAlerta(
        'Dados do usuário inconsistentes! Verifique as informações do cadastro', 'erro'
      )
      setUsuario({
        ...usuario,
        senha: '',
      })
      setConfirmaSenha('')
    }

    setIsLoading(false);
  }

  console.log(JSON.stringify(usuario));
  console.log(confirmaSenha);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
  {/* Imagem lado esquerdo */}
  <div className="w-2/3 hidden lg:block">
    <img
      src="https://ik.imagekit.io/dmzx7is6a/Blog%20Pessoal/imageSignUp.png?updatedAt=1751679322348"
      alt="imagem de representação de cadastro"
      className="w-full"
    />
  </div>

  {/* Formulário de cadastro */}
  <form
    className="flex justify-center items-center flex-col w-1/2 gap-4"
    onSubmit={cadastrarNovoUsuario}
  >
    <h2 className="text-slate-900 text-5xl">Cadastrar</h2>

        {/* Nome */}
        <div className="flex flex-col w-full">
          <label htmlFor="nome" className="mb-1 text-sm font-medium">
            Nome
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden px-4">
            <User size={20} color="#000" height="bold" />
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="w-full px-4 py-2 bg-gray-100 focus:outline-none text-black font-normal"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
        </div>

        {/* Usuario */}
        <div className="flex flex-col w-full">
          <label htmlFor="usuario" className="mb-1 text-sm font-medium">
            Usuário
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden px-4">
            <EnvelopeSimple size={20} color="#000" weight="bold" />
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="exemplo@email.com"
              className="w-full px-4 py-2 bg-gray-100 focus:outline-none text-black font-normal"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
        </div>

        {/* Foto */}
        <div className="flex flex-col w-full">
          <label htmlFor="foto" className="mb-1 text-sm font-medium">
            Foto (URL)
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden px-4">
            <Camera size={20} color="#000" height="bold" />
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Link da imagem"
              className="w-full px-4 py-2 bg-gray-100 focus:outline-none text-black font-normal"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
        </div>
        
    
        {/* Senha */}
        <div className="flex flex-col w-full">
          <label htmlFor="senha" className="mb-1 text-sm font-medium">
            Senha
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden px-4">
            <Key size={20} color="#000" height="bold" />
            <input
              type={mostrarSenha ? "text" : "password"}
              id="senha"
              name="senha"
              placeholder="Senha"
              className="w-full px-4 py-2 bg-gray-100 focus:outline-none text-black font-normal"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="ml-2 p-1"
              aria-label={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
            >
              {mostrarSenha ? (
                <EyeSlash size={20} color="#000" weight="bold" />
              ) : (
                <Eye size={20} color="#000" height="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Confirmar Senha */}
        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha" className="mb-1 text-sm font-medium">
            Confirmar Senha
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden px-4">
            <Key size={20} color="#000" height="bold" />
            <input
              type={mostrarConfirmarSenha ? "text" : "password"}
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="w-full px-4 py-2 bg-gray-100 focus:outline-none text-black font-normal"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              className="ml-2 p-1"
              aria-label={mostrarConfirmarSenha ? "Esconder senha" : "Mostrar senha"}
            >
              {mostrarConfirmarSenha ? (
                <EyeSlash size={20} color="#000" weight="bold" />
              ) : (
                <Eye size={20} color="#000" height="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-around w-full gap-8">
          <button
            type="reset"
            className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
            onClick={retornar}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center"
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
              <span>Cadastrar</span>
            )}
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default Cadastro;

