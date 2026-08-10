<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 📚 API de Gestão de Livros e Autores — LAPISCO

API RESTful desenvolvida em NestJS para o gerenciamento modular de livros e autores, contando com suporte a relacionamento *Many-to-Many*, paginação, filtros avançados, validações de entrada e persistência em banco de dados PostgreSQL containerizado.

---

## 🚀 Tecnologias Utilizadas

* **Framework:** [NestJS](https://nestjs.com/) (TypeScript)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [TypeORM](https://typeorm.io/)
* **Containerização:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
* **Documentação:** [Swagger / OpenAPI](https://swagger.io/)
* **Validação & Transformação:** `class-validator` e `class-transformer`

---

## 🛠️ Arquitetura e Boas Práticas

* **Estrutura Modular:** Código separado por módulos independentes (`books`, `authors`, `common`).
* **Tratamento de Dados e DTOs:** Validação rigorosa de payloads de entrada via `class-validator`.
* **Formatação de Datas:** Suporte amigável ao padrão brasileiro (`DD-MM-YYYY`) nos DTOs, convertido nativamente no Service para armazenamento no PostgreSQL.
* **Relacionamento N:N Autônomo:** Ao cadastrar um livro com nomes de autores, a API vincula automaticamente os autores existentes ou cria novos registros caso ainda não existam.

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)
* *(Opcional)* [Node.js](https://nodejs.org/) versão 18+ (caso queira executar fora do Docker)

---

## 📦 Como Configurar e Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DA_PASTA_DO_PROJETO>



