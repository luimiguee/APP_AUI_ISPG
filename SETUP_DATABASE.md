# Configuração da Base de Dados - StudyFlow

Este guia explica como configurar e inicializar a base de dados MySQL para a aplicação StudyFlow.

## Pré-requisitos

- Docker e Docker Compose instalados
- Node.js instalado
- npm ou yarn instalado

## Inicialização Automática

A base de dados é criada automaticamente quando o servidor Node.js é iniciado. O sistema irá:

1. ✅ Criar a base de dados `app_aui_ispg` se não existir
2. ✅ Criar a tabela `users` com todas as colunas necessárias
3. ✅ Verificar se existe algum administrador

## Configuração Manual

### 1. Iniciar MySQL com Docker Compose

```bash
docker-compose up -d mysql
```

Isso irá:
- Criar um container MySQL 8.0
- Criar a base de dados `app_aui_ispg`
- Configurar utilizador root com password `rootpassword`
- Expor a porta 3306

### 2. Configurar Variáveis de Ambiente

Crie um ficheiro `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=app_aui_ispg
PORT=3000
```

### 3. Executar Script SQL (Opcional)

Se preferir inicializar manualmente, pode executar o script SQL:

```bash
# Usando MySQL CLI
mysql -u root -prootpassword < init.sql

# Ou usando Docker
docker exec -i mysql-db mysql -uroot -prootpassword < init.sql
```

### 4. Instalar Dependências e Iniciar Servidor

```bash
npm install
node server.js
```

O servidor irá verificar e criar automaticamente todas as estruturas necessárias.

## Estrutura da Base de Dados

### Tabela: `users`

| Coluna      | Tipo                | Descrição                          |
|-------------|---------------------|------------------------------------|
| id          | INT AUTO_INCREMENT  | Identificador único                |
| email       | VARCHAR(255) UNIQUE | Email do utilizador (único)        |
| password    | VARCHAR(255)        | Hash da password (bcrypt)          |
| role        | ENUM('user','admin')| Papel do utilizador (padrão: user) |
| created_at  | TIMESTAMP           | Data de criação                    |
| updated_at  | TIMESTAMP           | Data de última atualização         |

### Índices

- `idx_email`: Índice no campo email para pesquisas rápidas
- `idx_role`: Índice no campo role para filtragem por papel

## Criar Primeiro Administrador

### Método 1: Via Interface Web

1. Registe-se através da página inicial
2. Aceda ao phpMyAdmin: http://localhost:8080
3. Execute:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'seu-email@exemplo.com';
   ```

### Método 2: Via API (requer autenticação admin)

Se já tiver um administrador:
1. Faça login como admin
2. Aceda ao painel de administração
3. Altere o role de qualquer utilizador para "admin"

### Método 3: Via MySQL CLI

```bash
# Conectar ao MySQL
docker exec -it mysql-db mysql -uroot -prootpassword

# Selecionar base de dados
USE app_aui_ispg;

# Alterar role de um utilizador existente
UPDATE users SET role = 'admin' WHERE email = 'seu-email@exemplo.com';
```

## Acesso ao phpMyAdmin

Acesse: http://localhost:8080

**Credenciais:**
- Servidor: `mysql`
- Utilizador: `root`
- Password: `rootpassword`

## Verificação

Para verificar se tudo está a funcionar:

1. **Verificar conexão:**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Testar registo:**
   ```bash
   curl -X POST http://localhost:3000/api/register \
     -H "Content-Type: application/json" \
     -d '{"email":"teste@exemplo.com","password":"password123"}'
   ```

3. **Testar login:**
   ```bash
   curl -X POST http://localhost:3000/api/login \
     -H "Content-Type: application/json" \
     -d '{"email":"teste@exemplo.com","password":"password123"}'
   ```

## Troubleshooting

### Erro: "Access denied for user"

Verifique se as credenciais no ficheiro `.env` estão corretas.

### Erro: "Database does not exist"

Execute manualmente:
```sql
CREATE DATABASE app_aui_ispg CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Erro: "Cannot connect to MySQL"

1. Verifique se o container está a correr: `docker ps`
2. Verifique os logs: `docker logs mysql-db`
3. Reinicie o container: `docker-compose restart mysql`

### Erro ao criar tabela

A tabela é criada automaticamente, mas se houver problemas, execute:
```bash
docker exec -i mysql-db mysql -uroot -prootpassword app_aui_ispg < init.sql
```

## Segurança

⚠️ **IMPORTANTE:**
- Altere as passwords padrão em produção
- Use variáveis de ambiente para credenciais
- Não commite o ficheiro `.env` no Git
- Use HTTPS em produção
- Configure firewall adequadamente

## Backup

Para fazer backup da base de dados:

```bash
docker exec mysql-db mysqldump -uroot -prootpassword app_aui_ispg > backup.sql
```

Para restaurar:

```bash
docker exec -i mysql-db mysql -uroot -prootpassword app_aui_ispg < backup.sql
```

