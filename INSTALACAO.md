# Guia de Instalação Completo

## 📋 Pré-requisitos

Antes de começar, precisa de instalar:

1. **Node.js e npm**
2. **Docker e Docker Compose**

---

## 1️⃣ Instalar Node.js e npm

### macOS (usando Homebrew)

```bash
# Instalar Homebrew (se ainda não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node

# Verificar instalação
node --version
npm --version
```

### macOS (usando instalador oficial)

1. Aceda a: https://nodejs.org/
2. Descarregue a versão LTS (Long Term Support)
3. Execute o instalador
4. Siga as instruções

### Linux (Ubuntu/Debian)

```bash
# Atualizar pacotes
sudo apt update

# Instalar Node.js e npm
sudo apt install nodejs npm

# Verificar instalação
node --version
npm --version
```

### Windows

1. Aceda a: https://nodejs.org/
2. Descarregue a versão LTS
3. Execute o instalador
4. Siga as instruções (certifique-se de marcar a opção "Add to PATH")

---

## 2️⃣ Instalar Docker e Docker Compose

### macOS

**Opção A: Docker Desktop (Recomendado)**

1. Aceda a: https://www.docker.com/products/docker-desktop
2. Descarregue Docker Desktop para Mac
3. Execute o instalador
4. Abra Docker Desktop e aguarde até estar a correr

**Opção B: Usando Homebrew**

```bash
brew install --cask docker
```

### Linux (Ubuntu/Debian)

```bash
# Atualizar pacotes
sudo apt update

# Instalar Docker
sudo apt install docker.io docker-compose

# Adicionar utilizador ao grupo docker (para não precisar de sudo)
sudo usermod -aG docker $USER

# Reiniciar sessão ou executar:
newgrp docker

# Verificar instalação
docker --version
docker-compose --version
```

### Windows

1. Aceda a: https://www.docker.com/products/docker-desktop
2. Descarregue Docker Desktop para Windows
3. Execute o instalador
4. Reinicie o computador se necessário
5. Abra Docker Desktop

---

## 3️⃣ Verificar Instalações

Execute os seguintes comandos para verificar se tudo está instalado:

```bash
# Verificar Node.js
node --version
# Deve mostrar algo como: v18.x.x ou superior

# Verificar npm
npm --version
# Deve mostrar algo como: 9.x.x ou superior

# Verificar Docker
docker --version
# Deve mostrar a versão do Docker

# Verificar Docker Compose
docker-compose --version
# Deve mostrar a versão do Docker Compose
```

---

## 4️⃣ Instalar Dependências do Projeto

Depois de ter Node.js instalado, execute:

```bash
cd /Users/miguelpato/APP_AUI_ISPG
npm install
```

Isto irá instalar todas as dependências necessárias:
- `express` - Framework web
- `mysql2` - Cliente MySQL
- `bcrypt` - Encriptação de passwords
- `cors` - Permissões CORS
- `dotenv` - Gestão de variáveis de ambiente
- `nodemon` - Auto-reload em desenvolvimento

---

## 5️⃣ Configurar Variáveis de Ambiente

Crie um ficheiro `.env` na raiz do projeto:

```bash
# No terminal, dentro da pasta do projeto
cat > .env << EOF
# Configuração da Base de Dados MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=app_aui_ispg

# Porta do Servidor
PORT=3000
EOF
```

Ou crie manualmente o ficheiro `.env` com o conteúdo acima.

---

## 6️⃣ Iniciar MySQL e phpMyAdmin

```bash
# Iniciar os serviços
docker-compose up -d

# Verificar se estão a correr
docker-compose ps
```

Aguarde alguns segundos para que os serviços iniciem completamente.

---

## 7️⃣ Iniciar o Servidor

```bash
# Modo produção
npm start

# Modo desenvolvimento (com auto-reload)
npm run dev
```

O servidor estará disponível em: `http://localhost:3000`

---

## ✅ Verificação Final

1. **Servidor Node.js:** `http://localhost:3000` deve mostrar a página de login
2. **phpMyAdmin:** `http://localhost:8080` deve mostrar a interface do phpMyAdmin
3. **MySQL:** Deve estar a correr na porta 3306

---

## 🆘 Resolução de Problemas

### Node.js não encontrado

- Certifique-se de que instalou o Node.js corretamente
- Reinicie o terminal após a instalação
- Verifique se o Node.js está no PATH: `echo $PATH`

### Docker não encontrado

- Certifique-se de que o Docker Desktop está a correr
- No macOS/Linux, pode precisar de usar `sudo` (ou adicionar o utilizador ao grupo docker)

### Porta já em uso

Se a porta 3000 ou 8080 estiverem em uso:

- Altere a porta no ficheiro `.env` (PORT=3001)
- Ou altere a porta do phpMyAdmin no `docker-compose.yml`

### Erro de conexão à base de dados

- Verifique se o Docker está a correr: `docker-compose ps`
- Verifique se os serviços estão saudáveis: `docker-compose logs mysql`
- Aguarde alguns segundos após iniciar o Docker

---

## 📚 Próximos Passos

Depois de ter tudo instalado e a correr, consulte o `README.md` para instruções de uso da aplicação.





