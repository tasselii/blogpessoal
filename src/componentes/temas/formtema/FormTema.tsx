import {
  useState,
  useContext,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormTema() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tema, setTema] = useState<Tema>({} as Tema);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  // Buscar tema por id para editar
  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("401")) {
        handleLogout();
      } else {
        console.error("Erro inesperado:", error);
      }
    }
  }

  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado!");
      navigate("/");
      return;
    }

    if (id) {
      buscarTemaPorId(id);
    }
  }, [id, token]);

  // Atualiza o estado conforme input
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  // Função para cadastrar ou atualizar tema
  async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        // Atualizar tema - PUT com id na URL
        await atualizar(`/temas/${id}`, tema, setTema, {
          headers: { Authorization: token },
        });
        alert("O Tema foi atualizado com sucesso!");
      } else {
        // Cadastrar novo tema - POST
        await cadastrar("/temas", tema, setTema, {
          headers: { Authorization: token },
        });
        alert("O Tema foi cadastrado com sucesso!");
      }
      navigate("/temas");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert(
          id
            ? "Erro ao atualizar o tema!"
            : "Erro ao cadastrar o tema!"
        );
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id ? "Editar Tema" : "Cadastrar Tema"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Tema</label>
          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2"
            value={tema.descricao || ""}
            onChange={atualizarEstado}
            required
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
          disabled={isLoading}
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
            <span>{id ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormTema;
