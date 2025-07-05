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
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tema, setTema] = useState<Tema>({} as Tema);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

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
      ToastAlerta("Você precisa estar logado!", 'info');
      navigate("/");
      return;
    }

    if (id) {
      buscarTemaPorId(id);
    }
  }, [id, token]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await atualizar(`/temas/${id}`, tema, setTema, {
          headers: { Authorization: token },
        });
        ToastAlerta("O Tema foi atualizado com sucesso!", 'sucesso');
      } else {
        await cadastrar("/temas", tema, setTema, {
          headers: { Authorization: token },
        });
        ToastAlerta("O Tema foi cadastrado com sucesso!", 'sucesso');
      }

    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta(
          id ? "Erro ao atualizar o tema!" : "Erro ao cadastrar o tema!",
          'erro'
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

      <form className="w-full max-w-md flex flex-col gap-4" onSubmit={gerarNovoTema}>
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
