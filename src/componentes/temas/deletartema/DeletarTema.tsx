import { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";


function DeletarTema() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tema, setTema] = useState<Tema>({} as Tema);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token || "";

  const { id } = useParams<{ id: string }>();

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      console.error("Erro ao buscar tema:", error);
      if (error.message?.includes("401")) {
        ToastAlerta("Sessão expirada. Faça login novamente.", 'info');
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", 'erro');
      navigate("/");
      return;
    }

    if (id) {
      buscarTemaPorId(id);
    }
  }, [id, token]);

  async function deletarTema() {
    if (!id) {
      ToastAlerta("ID do tema não encontrado.", 'info');
      return;
    }

    setIsLoading(true);

    try {
      console.log("Tentando deletar tema com ID:", id);

      await deletar(`/temas/${id}`, {
        headers: { Authorization: token },
      });

      ToastAlerta("Tema excluído com sucesso!", 'sucesso');
      navigate("/temas")
      retornar();
    } catch (error: any) {
      console.error("Erro ao deletar:", error);

      if (error.message?.includes("401")) {
        ToastAlerta("Sessão expirada. Faça login novamente.", 'info');
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar o tema!", 'erro');
      }
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/temas");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar tema</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between shadow">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Tema
        </header>

        <p className="p-8 text-3xl bg-slate-200 h-full">{tema.descricao}</p>

        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center"
            onClick={deletarTema}
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
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;

