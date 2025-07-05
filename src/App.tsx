import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./assets/pages/home/home"
import Footer from "./componentes/footer/Footer"
import Navbar from "./componentes/navbar/Navbar"
import ListaTemas from "./componentes/temas/listatemas/ListaTemas"
import FormTema from "./componentes/temas/formtema/FormTema"
import Cadastro from "./assets/pages/cadastro/Cadastro"
import Login from "./assets/pages/login/Login"
import { AuthProvider } from "./contexts/AuthContext"
import DeletarTema from "./componentes/temas/deletartema/DeletarTema";
import ListaPostagens from "./componentes/postagens/listapostagens/ListaPostagens"
import FormPostagem from "./componentes/postagens/formpostagem/FormPostagem"
import DeletarPostagem from "./componentes/postagens/deletarpostagem/DeletarPostagem"
import Perfil from "./assets/pages/perfil/Perfil"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import DetalhePostagem from "./componentes/postagens/detalhepostagem/DetalhePostagem"


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
          <BrowserRouter>
              <Navbar />
                <div className="min-h-[80vh]  text-slate-300">
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/temas" element={<ListaTemas />} />
                    <Route path="/cadastrartema" element={<FormTema />} />
                    <Route path="/editartema/:id" element={<FormTema />} />
                    <Route path="/deletartema/:id" element={<DeletarTema />} />
                    <Route path="/postagens" element={<ListaPostagens />} />
                    <Route path="/cadastrarpostagem" element={<FormPostagem />} />
                    <Route path="/editarpostagem/:id" element={<FormPostagem />} />
                    <Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/postagem/:id" element={<DetalhePostagem />} /> 
                  </Routes>
                </div>
              <Footer />
          </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App


