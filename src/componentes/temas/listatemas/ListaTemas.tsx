import { useContext, useEffect, useState } from "react";
import CardTemas from "../cardtemas/CardTemas";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import ModalTema from "../modaltemas/ModalTema";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {
  const navigate = useNavigate();
  const [temas, setTemas] = useState<Tema[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas() {
    setIsLoading(true);
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado!", 'info');
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, []); // evitar dependência em temas.length para não causar loop infinito

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
      <ModalTema />
      </div>
  
      {isLoading && temas.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto my-8"
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-4">
          {!isLoading && temas.length === 0 && (
            <span className="my-8 text-3xl text-center">
              Nenhum tema foi encontrado
            </span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temas.map((tema) => (
              <CardTemas key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaTemas;
function alert(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}

function toastAlerta(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}

