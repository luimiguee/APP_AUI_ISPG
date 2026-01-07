/**
 * Servidor Express com API MySQL
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { 
    testConnection, 
    loginUser, 
    registerUser,
    getUserById,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getGeneralStats
} = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'user-id']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tratar pedidos OPTIONS (preflight)
app.options('*', cors());

// Testar conexão ao iniciar
testConnection().then(success => {
    if (success) {
        console.log('🚀 Servidor pronto para receber pedidos!');
    } else {
        console.error('⚠️  Servidor iniciado mas sem conexão à base de dados');
    }
});

// Rotas da API (DEVEM estar ANTES do express.static)

/**
 * Rota de teste
 */
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'API está a funcionar',
        timestamp: new Date().toISOString()
    });
});

/**
 * Rota de login
 * POST /api/login
 * Body: { email: string, password: string }
 */
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validação básica
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email e palavra-passe são obrigatórios' 
            });
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Formato de email inválido' 
            });
        }
        
        // Validar comprimento da password
        if (password.length < 8) {
            return res.status(400).json({ 
                error: 'A palavra-passe deve ter pelo menos 8 caracteres' 
            });
        }
        
        // Fazer login
        const user = await loginUser(email, password);
        
        res.json({
            success: true,
            message: 'Login realizado com sucesso',
            user: user
        });
    } catch (error) {
        console.error('Erro no login:', error.message);
        res.status(401).json({
            error: error.message || 'Erro ao fazer login'
        });
    }
});

/**
 * Rota de registo
 * POST /api/register
 * Body: { email: string, password: string }
 */
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validação básica
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email e palavra-passe são obrigatórios' 
            });
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Formato de email inválido' 
            });
        }
        
        // Validar comprimento da password
        if (password.length < 8) {
            return res.status(400).json({ 
                error: 'A palavra-passe deve ter pelo menos 8 caracteres' 
            });
        }
        
        // Registar utilizador
        const user = await registerUser(email, password);
        
        res.status(201).json({
            success: true,
            message: 'Utilizador registado com sucesso',
            user: user
        });
    } catch (error) {
        console.error('Erro no registo:', error.message);
        res.status(400).json({
            error: error.message || 'Erro ao registar utilizador'
        });
    }
});

/**
 * Rota para obter dados do utilizador
 * GET /api/user/:id
 */
app.get('/api/user/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        
        if (isNaN(userId)) {
            return res.status(400).json({ 
                error: 'ID de utilizador inválido' 
            });
        }
        
        const user = await getUserById(userId);
        
        res.json({
            success: true,
            user: user
        });
    } catch (error) {
        console.error('Erro ao obter utilizador:', error.message);
        res.status(404).json({
            error: error.message || 'Utilizador não encontrado'
        });
    }
});

// Rotas de páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/studyflow', (req, res) => {
    res.sendFile(path.join(__dirname, 'studyflow.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Middleware para excluir rotas /api/* do servidor estático
// Deve estar ANTES do express.static para garantir que rotas da API não são servidas como estáticas
app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
        // Se chegou aqui, a rota da API não foi encontrada nas rotas definidas acima
        return res.status(404).json({ error: 'Rota da API não encontrada' });
    }
    next();
});

// Servir ficheiros estáticos (HTML, CSS, JS) - DEPOIS das rotas da API
app.use(express.static(path.join(__dirname)));

// Middleware para verificar se é admin
async function checkAdmin(req, res, next) {
    try {
        const userId = req.headers['user-id'];
        if (!userId) {
            return res.status(401).json({ error: 'Não autenticado' });
        }
        
        const user = await getUserById(parseInt(userId));
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
        }
        
        next();
    } catch (error) {
        res.status(401).json({ error: 'Erro ao verificar permissões' });
    }
}

// Rotas de Admin
app.get('/api/admin/stats', checkAdmin, async (req, res) => {
    try {
        const stats = await getGeneralStats();
        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/admin/users', checkAdmin, async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/admin/users/:id/role', checkAdmin, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { role } = req.body;
        
        if (!role || !['user', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Role inválido' });
        }
        
        await updateUserRole(userId, role);
        res.json({ success: true, message: 'Role atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/admin/users/:id', checkAdmin, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const currentUserId = parseInt(req.headers['user-id']);
        
        // Não permitir que admin se remova a si mesmo
        if (userId === currentUserId) {
            return res.status(400).json({ error: 'Não pode remover a sua própria conta' });
        }
        
        await deleteUser(userId);
        res.json({ success: true, message: 'Utilizador removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🌐 Servidor a correr em http://localhost:${PORT}`);
    console.log(`📊 phpMyAdmin disponível em http://localhost:8080`);
    console.log(`💾 MySQL disponível em localhost:3306`);
});





