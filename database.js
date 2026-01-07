/**
 * Configuração e funções da base de dados MySQL
 */

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Configuração da conexão MySQL
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'app_aui_ispg',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Criar pool de conexões
const pool = mysql.createPool(dbConfig);

/**
 * Criar base de dados se não existir
 */
async function createDatabaseIfNotExists() {
    try {
        // Criar conexão sem especificar a base de dados
        const tempConfig = {
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            waitForConnections: true,
            connectionLimit: 10
        };
        
        const tempPool = mysql.createPool(tempConfig);
        
        // Criar base de dados se não existir
        await tempPool.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        
        await tempPool.end();
        console.log(`✅ Base de dados "${dbConfig.database}" verificada/criada com sucesso!`);
    } catch (error) {
        console.error('❌ Erro ao criar base de dados:', error.message);
        throw error;
    }
}

/**
 * Testar conexão com a base de dados
 */
async function testConnection() {
    try {
        // Primeiro, garantir que a base de dados existe
        await createDatabaseIfNotExists();
        
        // Depois, testar a conexão com a base de dados
        const connection = await pool.getConnection();
        console.log('✅ Conexão com MySQL estabelecida com sucesso!');
        connection.release();
        
        // Criar tabela de utilizadores se não existir
        await createUsersTable();
        
        // Verificar se existe algum administrador
        await createFirstAdminIfNeeded();
        
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar à base de dados:', error.message);
        return false;
    }
}

/**
 * Criar tabela de utilizadores
 */
async function createUsersTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        
        await pool.execute(query);
        
        // Verificar e adicionar coluna role se não existir (para tabelas antigas)
        try {
            const [columns] = await pool.execute(
                `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
                 WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'`,
                [dbConfig.database]
            );
            
            if (columns.length === 0) {
                await pool.execute('ALTER TABLE users ADD COLUMN role ENUM(\'user\', \'admin\') DEFAULT \'user\'');
                console.log('✅ Coluna "role" adicionada à tabela users');
            }
        } catch (e) {
            // Erro ao verificar/adicionar coluna, continuar
            console.warn('⚠️  Aviso ao verificar coluna role:', e.message);
        }
        
        console.log('✅ Tabela de utilizadores verificada/criada com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao criar tabela de utilizadores:', error.message);
        throw error;
    }
}

/**
 * Registar novo utilizador
 */
async function registerUser(email, password) {
    try {
        // Verificar se o email já existe
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );
        
        if (existingUsers.length > 0) {
            throw new Error('Este email já está registado');
        }
        
        // Hash da password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Inserir utilizador
        const [result] = await pool.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );
        
        return {
            id: result.insertId,
            email: email
        };
    } catch (error) {
        console.error('Erro ao registar utilizador:', error.message);
        throw error;
    }
}

/**
 * Login de utilizador
 */
async function loginUser(email, password) {
    try {
        // Buscar utilizador por email
        const [users] = await pool.execute(
            'SELECT id, email, password, role FROM users WHERE email = ?',
            [email]
        );
        
        if (users.length === 0) {
            throw new Error('Email ou palavra-passe incorretos');
        }
        
        const user = users[0];
        
        // Verificar password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            throw new Error('Email ou palavra-passe incorretos');
        }
        
        // Retornar dados do utilizador (sem password)
        return {
            id: user.id,
            email: user.email,
            role: user.role || 'user'
        };
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        throw error;
    }
}

/**
 * Obter utilizador por ID
 */
async function getUserById(userId) {
    try {
        const [users] = await pool.execute(
            'SELECT id, email, role, created_at FROM users WHERE id = ?',
            [userId]
        );
        
        if (users.length === 0) {
            throw new Error('Utilizador não encontrado');
        }
        
        return users[0];
    } catch (error) {
        console.error('Erro ao obter utilizador:', error.message);
        throw error;
    }
}

/**
 * Obter todos os utilizadores (apenas admin)
 */
async function getAllUsers() {
    try {
        const [users] = await pool.execute(
            'SELECT id, email, role, created_at FROM users ORDER BY created_at DESC'
        );
        return users;
    } catch (error) {
        console.error('Erro ao obter utilizadores:', error.message);
        throw error;
    }
}

/**
 * Atualizar role de utilizador
 */
async function updateUserRole(userId, role) {
    try {
        if (!['user', 'admin'].includes(role)) {
            throw new Error('Role inválido');
        }
        
        await pool.execute(
            'UPDATE users SET role = ? WHERE id = ?',
            [role, userId]
        );
        
        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar role:', error.message);
        throw error;
    }
}

/**
 * Remover utilizador
 */
async function deleteUser(userId) {
    try {
        await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
        return { success: true };
    } catch (error) {
        console.error('Erro ao remover utilizador:', error.message);
        throw error;
    }
}

/**
 * Obter estatísticas gerais
 */
async function getGeneralStats() {
    try {
        const [userCount] = await pool.execute('SELECT COUNT(*) as total FROM users');
        const [adminCount] = await pool.execute('SELECT COUNT(*) as total FROM users WHERE role = "admin"');
        const [recentUsers] = await pool.execute(
            'SELECT COUNT(*) as total FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
        );
        
        return {
            totalUsers: userCount[0].total,
            totalAdmins: adminCount[0].total,
            recentUsers: recentUsers[0].total
        };
    } catch (error) {
        console.error('Erro ao obter estatísticas:', error.message);
        throw error;
    }
}

/**
 * Criar primeiro administrador se não existir nenhum
 * Esta função pode ser chamada manualmente se necessário
 */
async function createFirstAdminIfNeeded() {
    try {
        const [admins] = await pool.execute('SELECT COUNT(*) as total FROM users WHERE role = "admin"');
        
        if (admins[0].total === 0) {
            console.log('ℹ️  Nenhum administrador encontrado. Crie o primeiro administrador através do registo.');
        }
    } catch (error) {
        console.error('Erro ao verificar administradores:', error.message);
    }
}

module.exports = {
    pool,
    testConnection,
    createDatabaseIfNotExists,
    registerUser,
    loginUser,
    getUserById,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getGeneralStats,
    createFirstAdminIfNeeded
};





