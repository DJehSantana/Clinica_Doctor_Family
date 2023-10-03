# Projeto de Frontend Dinâmico: Aplicação para Cadastro de Pacientes da Clínica Doctor Family 🩺

Este projeto é uma aplicação web que permite o cadastro de pacientes da clínica Doctor Family, uma rede de saúde que oferece atendimento médico de qualidade e acessível para toda a família. O objetivo deste projeto é demonstrar as habilidades adquiridas durante o módulo de Frontend Dinâmico do curso de Angular do projeto Santander Coders 2023.

## Funcionalidades 💡

A aplicação possui as seguintes funcionalidades:

- Um formulário para inserir os dados dos pacientes, como nome, cpf, email, gênero, data de nascimento e plano de saúde. O formulário utiliza o método `POST` para enviar os dados para a API do [CRUD CRUD], um serviço online que permite criar, ler, atualizar e deletar dados em um banco de dados simples e gratuito. Os dados cadastrados também são persistidos no Local Storage do navegador.
- Uma tabela para visualizar os dados dos pacientes cadastrados, mostrando as informações inseridas no formulário. A tabela é atualizada a cada novo cadastro ou a cada 5 segundos, utilizando a método `setInterval` do Javascript.
- Um modal com botões para editar ou deletar o cadastro de um paciente específico. Ao clicar em um botão, a aplicação faz uma requisição à API do CRUD CRUD, utilizando os métodos `PUT` ou `DELETE`, respectivamente, para realizar as operações no banco de dados.
- Persistência dos dados no `localStorage` do navegador, de forma que os dados não sejam perdidos ao atualizar ou fechar a página. A aplicação verifica se há dados salvos no `localStorage` ao ser carregada e os utiliza para preencher a tabela.
- Um sistema de login para validar se o usuário está logado na aplicação antes de permitir o acesso as páginas da aplicação. Caso o usuário não tenha um token de acesso salvo no sessionStorage do navegador, ele será encaminhado a tela de login para realizar o login na aplicação.

## Como usar 🚀

Para usar a aplicação, basta seguir os seguintes passos:

- Acesse a página da aplicação no seu navegador de preferência, através do link da hospedagem:
- Faça o Login na aplicação com as credenciais: usuario: admin, senha: admin
- Preencha o formulário com os dados de um paciente e clique no botão "Salvar". Você verá que os dados foram adicionados à tabela.
- Crie quantos pacientes quiser, seguindo o mesmo procedimento. Você também pode editar ou deletar um paciente, clicando no cadastro do paciente na tabela.
- Para rodar a aplicação localmente, clone este repositório e substitua os links de redirecionamento da página, bem como a URL da API do CRUD CRUD no arquivo `apiCrud.js`.
- Após isso você poderar realizar as operações e visualizar os dados na API do CRUD CRUD acessando o link gerado pelo serviço.


