# StudyFlow - Gestão Académica Inteligente

Aplicação web completa para ajudar estudantes a organizarem o seu percurso académico, permitindo a gestão de tarefas, trabalhos, testes e horários de forma simples, intuitiva e visualmente clara.

## 🎯 Funcionalidades Gerais

### ✅ Página Inicial
- **Explicação da aplicação** - Apresentação clara do propósito e funcionalidades
- **Design moderno e atrativo** - Interface visualmente apelativa
- **Call-to-action** - Botões para registo e login facilmente acessíveis
- **Secção de funcionalidades** - Descrição detalhada de todas as capacidades

### 🔐 Registo e Login de Utilizadores
- **Sistema de autenticação completo** - Integrado com MySQL
- **Registo de novos utilizadores** - Com validação de dados
- **Login seguro** - Com encriptação de passwords (bcrypt)
- **Gestão de sessão** - Persistência de autenticação
- **Modais acessíveis** - Formulários com validação em tempo real

### 📱 Interface Responsiva
- **Design adaptável** - Funciona em desktop, tablet e mobile
- **Layout flexível** - Grid system responsivo
- **Navegação otimizada** - Menu adaptável ao tamanho do ecrã
- **Touch-friendly** - Botões e elementos otimizados para toque

### 📚 Gestão Académica
- **Tarefas** - Adicionar, editar, remover e marcar como concluídas
- **Trabalhos** - Com acompanhamento de progresso (0-100%)
- **Testes** - Com data, hora e prioridades
- **Vista Semanal** - Calendário interativo com todos os eventos
- **Estatísticas** - Contadores em tempo real

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker e Docker Compose (para MySQL e phpMyAdmin)
- npm ou yarn

### Passo 1: Instalar Dependências

```bash
npm install
```

### Passo 2: Configurar Variáveis de Ambiente

Crie um ficheiro `.env` na raiz do projeto:

```env
# Configuração da Base de Dados MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=app_aui_ispg

# Porta do Servidor
PORT=3000
```

### Passo 3: Iniciar MySQL e phpMyAdmin

```bash
docker-compose up -d
```

Aguarde alguns segundos para que os serviços iniciem completamente.

### Passo 4: Iniciar o Servidor

```bash
npm start
```

Ou para desenvolvimento com auto-reload:

```bash
npm run dev
```

## 📖 Como Usar

### 1. Aceder à Aplicação

Abra o navegador e aceda a: `http://localhost:3000`

### 2. Criar Conta

1. Clique em **"Criar Conta"** ou **"Começar Agora"**
2. Preencha o formulário:
   - Email (obrigatório)
   - Palavra-passe (mínimo 8 caracteres)
   - Confirmação de palavra-passe
3. Clique em **"Criar Conta"**

### 3. Fazer Login

1. Clique em **"Iniciar Sessão"**
2. Introduza o seu email e palavra-passe
3. Clique em **"Iniciar Sessão"**

### 4. Usar o StudyFlow

Após o login, será redirecionado para a aplicação principal onde pode:
- Adicionar tarefas, trabalhos e testes
- Visualizar o calendário semanal
- Acompanhar estatísticas
- Gerir todos os seus itens académicos

## 🛠️ Estrutura do Projeto

```
APP_AUI_ISPG/
├── index.html          # Página inicial com explicação e login/registo
├── studyflow.html      # Aplicação principal de gestão académica
├── server.js           # Servidor Express com API
├── database.js         # Configuração e funções MySQL
├── package.json        # Dependências do projeto
├── docker-compose.yml  # Configuração Docker (MySQL + phpMyAdmin)
├── .env               # Variáveis de ambiente (criar manualmente)
├── README.md          # Este ficheiro
├── INSTALACAO.md      # Guia de instalação dos pré-requisitos
└── STUDYFLOW_README.md # Documentação detalhada do StudyFlow
```

## 📡 Endpoints da API

### POST `/api/login`
Fazer login de um utilizador.

**Body:**
```json
{
  "email": "utilizador@exemplo.com",
  "password": "senha123"
}
```

### POST `/api/register`
Registar um novo utilizador.

**Body:**
```json
{
  "email": "novo@exemplo.com",
  "password": "senha123"
}
```

### GET `/api/user/:id`
Obter dados de um utilizador por ID.

## 🎨 Características de Acessibilidade

### WCAG 2.1 Compliance
- ✅ Semântica HTML correta
- ✅ Atributos ARIA apropriados
- ✅ Navegação completa por teclado
- ✅ Indicadores de foco visíveis
- ✅ Contraste adequado (4.5:1 mínimo)
- ✅ Suporte para leitores de ecrã
- ✅ Mensagens de erro claras

### Responsividade
- ✅ Design adaptável a diferentes tamanhos de ecrã
- ✅ Layout otimizado para dispositivos móveis
- ✅ Texto e elementos redimensionáveis
- ✅ Menu adaptável

### Preferências do Utilizador
- ✅ Respeita `prefers-reduced-motion`
- ✅ Suporte para modo escuro (`prefers-color-scheme: dark`)
- ✅ Suporte para alto contraste (`prefers-contrast: high`)

## 🔒 Segurança

- ✅ Passwords encriptadas com bcrypt
- ✅ Validação tanto no cliente quanto no servidor
- ✅ Proteção contra SQL injection (prepared statements)
- ✅ Validação de entrada de dados
- ✅ Gestão segura de sessões

## 📊 Acesso ao phpMyAdmin

1. Aceda a: `http://localhost:8080`
2. **Credenciais:**
   - **Servidor:** `mysql` (ou `localhost`)
   - **Utilizador:** `root`
   - **Palavra-passe:** `rootpassword`

## 🧪 Testes Recomendados

### Testes de Acessibilidade
- ✅ Navegação apenas com teclado
- ✅ Teste com leitor de ecrã (NVDA/JAWS/VoiceOver)
- ✅ Verificação de contraste
- ✅ Validação com WAVE ou axe DevTools

### Testes de Funcionalidade
- ✅ Registo e login de utilizadores
- ✅ Gestão de tarefas, trabalhos e testes
- ✅ Vista semanal
- ✅ Estatísticas
- ✅ Responsividade em diferentes dispositivos

## 🛑 Parar os Serviços

```bash
# Parar MySQL e phpMyAdmin
docker-compose down

# Parar e remover volumes (apaga dados)
docker-compose down -v
```

## 📚 Documentação Adicional

- `INSTALACAO.md` - Guia completo de instalação dos pré-requisitos
- `STUDYFLOW_README.md` - Documentação detalhada do StudyFlow

## 🔧 Personalização

### Cores
Modifique as variáveis CSS em `:root` nos ficheiros HTML:
```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
}
```

### Base de Dados
Ajuste a configuração em `database.js` e `docker-compose.yml` conforme necessário.

## 🆘 Resolução de Problemas

### Erro de conexão à base de dados
- Verifique se o Docker está a correr: `docker-compose ps`
- Verifique os logs: `docker-compose logs mysql`
- Aguarde alguns segundos após iniciar o Docker

### Porta já em uso
- Altere a porta no ficheiro `.env` (PORT=3001)
- Ou altere a porta do phpMyAdmin no `docker-compose.yml`

### Dados não são guardados
- Verifique se o navegador permite localStorage
- Não use modo privado/incógnito

## 📚 Recursos Adicionais

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM - Web Accessibility In Mind](https://webaim.org/)
- [MDN - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Express.js Documentation](https://expressjs.com/)

---

**Desenvolvido com foco em acessibilidade, usabilidade e eficiência** 🎓
