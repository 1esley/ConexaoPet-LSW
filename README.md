# 🐾 Conexão PET

Uma plataforma web desenvolvida em **HTML, CSS e JavaScript puro** para incentivar a adoção responsável de animais e conectar pets disponíveis a possíveis adotantes.

---

## Objetivo

O projeto busca reduzir o abandono de animais e facilitar o processo de adoção através de uma interface simples e intuitiva.

---

##  Funcionalidades

### Cadastro de Pets
- Cadastro de novos animais para adoção;
- Validação de formulário utilizando `preventDefault()`;
- Feedback visual para sucesso e erro;
- Persistência automática dos dados no navegador.

### Filtros Combinados
Permite filtrar os pets simultaneamente por:

- Espécie;
- Porte;
- Idade.

Os filtros foram implementados utilizando **encadeamento de `filter()`**, conforme exigido pelo projeto.

### Lista de Favoritos
Ao clicar em **"Tenho Interesse"**, o pet é localizado através de `find()` e copiado para um array separado de favoritos, sendo exibido em uma barra lateral da aplicação.

### Remoção de Favoritos
Os pets podem ser removidos da lista de interessados utilizando `filter()`, atualizando automaticamente a interface e o `localStorage`.

### Processo de Adoção
Após demonstrar interesse em um pet, o usuário pode concluir a adoção.

Quando isso acontece:

- O pet é removido da lista de interessados;
- O pet deixa de aparecer na lista de pets disponíveis;
- O contador de adoções é atualizado;
- As alterações são salvas automaticamente no navegador.

### Estatísticas Dinâmicas
A aplicação mantém atualizados em tempo real:

- Quantidade de pets disponíveis;
- Quantidade de interessados;
- Número de adoções realizadas.

### Persistência de Dados
Todos os dados são armazenados utilizando:

- `localStorage`;
- `JSON.stringify()`;
- `JSON.parse()`.

Ao recarregar a página, todas as informações permanecem disponíveis.

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript ES6+
- LocalStorage API

---

## Conceitos de JavaScript Aplicados

### Vetores e Objetos
Utilizados para representar os pets cadastrados, favoritos e adoções realizadas.

### Manipulação do DOM
Uso de:

- `createElement()`
- `appendChild()`
- `innerHTML`
- `getElementById()`
- `querySelector()`

### Eventos
Manipulação dos eventos:

- `click`
- `submit`
- `change`
- `keydown`

### Funções de Alta Ordem
Utilização de:

- `find()`
- `filter()`
- `forEach()`
- `some()`

### Persistência Local
Utilização de:

- `localStorage.setItem()`
- `localStorage.getItem()`
- `JSON.stringify()`
- `JSON.parse()`

### Modularização
Separação das responsabilidades em funções reutilizáveis e independentes.

---

## Acesse

[Visualizar Aplicação](https://1esley.github.io/ConexaoPet-LSW/)

---

## 📈 Melhorias Futuras

- Upload real de imagens;
- Busca por nome do pet;
- Histórico de adoções;
- Integração com banco de dados;
- Sistema de autenticação;
- Compartilhamento em redes sociais.

---

## 👨‍💻 Autores

Projeto desenvolvido para a disciplina de **Linguagem de Script para Web**.

- Equipe Conexão PET
Douglas Rodrigues 
Marcos Antônio
Rafael Silva
Wesley de Oliveira 

---

> "Adotar é transformar duas vidas ao mesmo tempo: a do animal e a do adotante."