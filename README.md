# Products Microservice

Bem-vindo ao repositório do **Products Microservice**! Este projeto utiliza [Prisma](https://www.prisma.io/) para gerenciamento de banco de dados e segue boas práticas para desenvolvimento e execução local.

## Passos para configuração do ambiente local

### 1. Clone o repositório

```bash
git clone https://github.com/nest-microservices-evandro/products_ms.git
cd products_ms
```

### 2. Instale as dependências

Certifique-se de ter o Node.js instalado em sua máquina. Em seguida, execute:

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Renomeie o arquivo `.env.example` para `.env`:

```bash
mv .env.example .env
```

Preencha as variáveis de ambiente no arquivo `.env` conforme necessário.

### 4. Execute as migrations

Certifique-se de que o banco de dados esteja configurado corretamente e acessível. Em seguida, execute:

```bash
npx prisma migrate dev
```

### 5. Inicie a aplicação

Para iniciar a aplicação em modo de desenvolvimento, use o comando:

```bash
npm run start:dev
```

## Tecnologias Utilizadas

- [Nestjs](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch: `git checkout -b minha-feature`.
3. Faça suas alterações e commit: `git commit -m 'Minha nova feature'`.
4. Envie suas alterações: `git push origin minha-feature`.
5. Abra um Pull Request neste repositório.

## Licença

Este projeto está licenciado sob a [MIT License](./LICENSE).

