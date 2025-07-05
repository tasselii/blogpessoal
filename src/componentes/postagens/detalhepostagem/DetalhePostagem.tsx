import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Postagem from '../../../models/Postagem';
import type Tema from '../../../models/Tema';
import { buscar, atualizar } from '../../../services/Service'; // Onde você colocará seu uploadImageToServer
import { DNA } from 'react-loader-spinner';
import { ToastAlerta } from '../../../utils/ToastAlerta';

// Importe as bibliotecas de Markdown
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function DetalhePostagem() {
  const [postagem, setPostagem] = useState<Postagem | null>(null);
  const [postagemOriginal, setPostagemOriginal] = useState<Postagem | null>(null);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const textareaRef = useRef<HTMLTextAreaElement>(null); // Usaremos um textarea

  async function buscarPostagemPorId() {
    try {
      await buscar(`/postagens/${id}`, (data: Postagem) => {
        setPostagem(data);
        setPostagemOriginal(data);
      }, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) handleLogout();
      ToastAlerta('Erro ao buscar postagem.', 'erro');
    }
  }

  async function buscarTemas() {
    try {
      await buscar('/temas', setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) handleLogout();
      ToastAlerta('Erro ao buscar temas.', 'erro');
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPostagemPorId();
      buscarTemas();
    }
  }, [id]);

  const handlePaste = async (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = event.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.type.indexOf('image') !== -1) {
        event.preventDefault(); // Previne que o DataURL seja colado como texto

        const file = item.getAsFile();
        if (file) {
          ToastAlerta('Fazendo upload da imagem...', 'info');
          try {
            const imageUrl = await uploadImageToServer(file); // Sua função de upload
            if (imageUrl) {
              const markdownLink = `![imagem colada](${imageUrl})`;

              // Inserir o link Markdown no textarea na posição do cursor
              const textarea = textareaRef.current;
              if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const newText =
                  postagem?.texto.substring(0, start) +
                  markdownLink +
                  postagem?.texto.substring(end);

                setPostagem(prevPostagem => ({
                  ...(prevPostagem as Postagem),
                  texto: newText,
                }));

                // Mover o cursor para depois do link inserido
                // setTimeout é usado para garantir que o DOM seja atualizado antes de tentar definir a seleção
                setTimeout(() => {
                  textarea.selectionStart = start + markdownLink.length;
                  textarea.selectionEnd = start + markdownLink.length;
                  textarea.focus();
                }, 0);
              }
              ToastAlerta('Imagem carregada e link Markdown inserido!', 'sucesso');
            }
          } catch (uploadError) {
            console.error('Erro ao fazer upload da imagem:', uploadError);
            ToastAlerta('Erro ao fazer upload da imagem.', 'erro');
          }
        }
      }
    }
  };

  // Implemente esta função no seu services/Service.ts
  // Ela deve enviar o `File` para o backend e retornar o URL público.
  const uploadImageToServer = async (file: File): Promise<string | null> => {
      const formData = new FormData();
      formData.append('file', file); // O nome do campo ('file' aqui) deve corresponder ao que seu backend espera

      try {
          // Exemplo de como você faria a chamada para seu serviço de upload
          // Lembre-se de importar 'uploadImagem' do seu Service.ts
          // Ex: const response = await uploadImagem('/api/upload-image', formData, {
          //   headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
          // });
          // return response.data.imageUrl; // Assumindo que seu backend retorna { imageUrl: '...' }

          // **MOCK para demonstração: Substitua isso pela sua lógica real!**
          const reader = new FileReader();
          return new Promise((resolve) => {
              reader.onload = () => {
                  resolve('https://via.placeholder.com/150/FF0000/FFFFFF?text=Imagem+Upload'); // URL de placeholder
              };
              reader.readAsArrayBuffer(file); // Leitura como ArrayBuffer para btoa
          });
      } catch (error) {
          console.error("Erro no upload da imagem:", error);
          ToastAlerta("Erro ao enviar imagem para o servidor.", 'erro');
          return null;
      }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
    } as Postagem);
  };

  const handleTemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const temaSelecionado = temas.find(t => t.id === +e.target.value) || null;
    setPostagem({
      ...postagem,
      tema: temaSelecionado,
    } as Postagem);
  };

  const salvarEdicao = async () => {
    try {
      if (!postagem?.id) {
        ToastAlerta('ID da postagem não encontrado.', 'erro');
        return;
      }
      
      // O campo texto já estará em Markdown no estado 'postagem.texto'
      await atualizar(`/postagens`, postagem, setPostagem, {
        headers: { Authorization: token },
      });

      ToastAlerta("Postagem atualizada com sucesso!", 'sucesso');
      setModoEdicao(false);
      setPostagemOriginal(postagem);
    } catch (error) {
      console.error("Erro ao atualizar postagem:", error);
      ToastAlerta("Erro ao atualizar postagem", 'erro');
    }
  };

  const cancelarEdicao = () => {
    if (postagemOriginal) {
      setPostagem(postagemOriginal);
    }
    setModoEdicao(false);
  };

  if (!postagem) {
    return (
      <DNA
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper mx-auto"
      />
    );
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      {modoEdicao ? (
        <>
          <input
            name="titulo"
            value={postagem.titulo}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded text-gray-900 text-lg"
            placeholder="Título"
          />

          {/* Usamos um textarea para entrada de Markdown */}
          <textarea
            ref={textareaRef}
            name="texto"
            value={postagem.texto}
            onChange={handleChange}
            onPaste={handlePaste} // Manipula a colagem aqui
            className="w-full border border-gray-300 p-2 mb-4 rounded text-gray-900 resize-none min-h-[150px] max-h-[400px] overflow-auto"
            placeholder="Texto da postagem (suporta Markdown e colagem de imagens)"
            rows={10}
          />

          <select
            value={postagem.tema?.id || ''}
            onChange={handleTemaChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded text-gray-900"
          >
            <option value="">Selecione um tema</option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}
          </select>

          <div className="flex gap-2 justify-end">
            <button
              onClick={salvarEdicao}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Salvar
            </button>
            <button
              onClick={cancelarEdicao}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">{postagem.titulo}</h1>
          {/* Exibe o Markdown como HTML */}
          <div className="text-gray-600 text-lg mb-6 prose max-w-none"> {/* Adicione 'prose' para estilos básicos do Tailwind Typography */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {postagem.texto}
            </ReactMarkdown>
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <strong>Tema:</strong> {postagem.tema?.descricao}
          </div>
          <div className="text-sm text-gray-700">
            <strong>Data:</strong>{' '}
            {new Intl.DateTimeFormat('pt-BR', {
              dateStyle: 'full',
              timeStyle: 'medium',
            }).format(new Date(postagem.data ?? ''))}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setModoEdicao(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Editar
            </button>
            <button
              onClick={() => navigate(`/deletarpostagem/${postagem.id}`)}
              className="text-sm text-red-600 hover:underline"
            >
              Deletar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DetalhePostagem;