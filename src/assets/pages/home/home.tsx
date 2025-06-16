function Home() {

  const usuario ={
      nome: "Thiago Tasseli",
      idade: 23
    }
  return (
    
    <div style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw"
    }}>
        <div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "80vw",
            }}>
                <h2>Seja Bem Vindo {usuario.nome}!</h2>
                <p>Expresse aqui seus pensamentos e opiniões</p>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "80vw",
            }}>
                <img 
                    src="https://i.imgur.com/VpwApCU.png"
                    alt="Imagem da Pagina Home"
                    width="400px"
                />
            </div>
        </div>
    </div>
  )
}

export default Home