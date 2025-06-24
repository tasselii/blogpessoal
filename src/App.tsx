import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./assets/pages/home/home"
import Footer from "./componentes/footer/Footer"
import Navbar from "./componentes/navbar/Navbar"
import Cadastro from "./assets/pages/cadastro/Cadastro"
import Login from "./assets/pages/login/Login"
import { AuthProvider } from "./contexts/AuthContexts"


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
            <Navbar />
              <div className="min-h-[80vh]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/cadastro" element={<Cadastro />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App