# 🚀 Blog Pessoal - Frontend

Este projeto é o frontend do Blog Pessoal, desenvolvido com **React**, **TypeScript** e **Vite**. O projeto segue uma arquitetura moderna com foco em escalabilidade, produtividade e boas práticas de desenvolvimento.

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca para construção de interfaces de usuário
- [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript com tipagem estática
- [Vite](https://vitejs.dev/) - Bundler rápido e moderno com HMR
- [ESLint](https://eslint.org/) - Linter para manter o código limpo e consistente
- [React Router DOM](https://reactrouter.com/en/main) - Navegação entre páginas

## 📜 Scripts Disponíveis

```bash
# 📦 Instalar as dependências
npm install

# 🧪 Rodar o projeto em ambiente de desenvolvimento
npm run dev

# 🏗️ Criar uma build de produção
npm run build

# 🔍 Visualizar a build
npm run preview

# 🧹 Rodar o linter
npm run lint
```

## 🧱 Estrutura do Projeto

```bash
src/
├── assets/         # 🖼️ Imagens e recursos estáticos
├── components/     # 🧩 Componentes reutilizáveis
├── pages/          # 📄 Páginas do sistema
├── services/       # 🌐 Integração com APIs
├── styles/         # 🎨 Estilos globais e variáveis
├── App.tsx         # 🔗 Componente principal
├── main.tsx        # 🚪 Ponto de entrada da aplicação
```

## ✅ ESLint com Regras Avançadas

Para produção, é recomendável ativar regras com verificação de tipos:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    // ou para regras mais rígidas
    // ...tseslint.configs.strictTypeChecked,
    // regras de estilo opcionais
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

### 🔌 Plugins Recomendados

Utilize os plugins abaixo para regras específicas de React:

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## 🤝 Contribuição

Sinta-se à vontade para contribuir com este projeto! Basta abrir uma issue ou pull request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

## 📬 Contato

Desenvolvido por [**Thiago Tasseli**](https://github.com/tasselii)

Fique à vontade para tirar dúvidas, dar sugestões ou contribuir! 😄
