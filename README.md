# Brain Agriculture

Este projeto foi desenvolvido utilizando **React** junto com **Vite** como ferramenta de build. A aplicação foi construída seguindo boas práticas de desenvolvimento, incluindo a separação clara de componentes e a organização de pastas para manter o código limpo e reutilizável.

## Estrutura do Projeto

Abaixo está uma visão geral das pastas principais do projeto e suas respectivas responsabilidades:

- **/assets**: Esta pasta contém arquivos de mídia, como imagens, ícones, e outros recursos que são utilizados ao longo do projeto.
- **/components**: Aqui estão os componentes React que foram criados para serem independentes e reutilizáveis em diversas partes da aplicação. Cada componente é desenvolvido de forma modular, facilitando a manutenção e extensão do projeto.
- **/contexts**: Esta pasta armazena os contextos do React usados para gerenciar o estado global da aplicação, garantindo que o estado seja facilmente acessível e gerenciável em diferentes partes da aplicação.
- **/pages**: Contém o conteúdo completo de cada página da aplicação. Cada página pode combinar vários componentes e gerenciar seu próprio estado local.
- **/routes**: Esta pasta é responsável pela configuração das rotas da aplicação, definindo como os diferentes caminhos da URL se conectam aos componentes e páginas específicos.
- **/utils**: Contém funções utilitárias e outras funcionalidades de apoio que são utilizadas em diversas partes da aplicação para evitar repetição de código e centralizar lógica comum.

## Comandos para Executar o Projeto

Para iniciar o projeto em modo de produção ou desenvolvimento, utilize os seguintes comandos:

### 1. Instalação das Dependências

Antes de tudo, certifique-se de instalar as dependências do projeto:

```bash
$ npm install
```

### 2. Modo de Desenvolvimento

Para iniciar a aplicação em modo de desenvolvimento, onde você pode fazer alterações e vê-las refletidas automaticamente:

```bash
$ npm run dev
```

### 3. Modo de Produção

Para iniciar o servidor em modo de produção:

```bash
$ npm start
```

Este comando inicia o servidor utilizando node index.js, que serve os arquivos estáticos da build do Vite.
