# StudyFlow - Gestão Académica

Aplicação web para ajudar estudantes a organizarem o seu percurso académico, permitindo a gestão de tarefas, trabalhos, testes e horários de forma simples, intuitiva e visualmente clara.

## 🎯 Funcionalidades

### ✅ Gestão de Tarefas
- Adicionar, editar e remover tarefas
- Definir prioridades (Normal, Importante, Urgente)
- Associar disciplinas e descrições
- Marcar como concluídas
- Visualizar por data

### 📄 Gestão de Trabalhos
- Adicionar trabalhos com prazos
- Acompanhar progresso (0-100%)
- Definir prioridades
- Associar disciplinas

### 📋 Gestão de Testes
- Adicionar testes com data e hora
- Definir prioridades
- Associar disciplinas
- Visualizar no calendário semanal

### 📅 Vista Semanal
- Calendário semanal interativo
- Visualização de todos os eventos da semana
- Destaque para o dia atual
- Indicadores visuais por tipo de evento

### 📊 Estatísticas
- Contador de tarefas, trabalhos e testes
- Contador de itens urgentes
- Atualização em tempo real

## 🚀 Como Usar

### Abrir a Aplicação

1. Abra o ficheiro `studyflow.html` no seu navegador
2. Ou, se tiver o servidor a correr, aceda a: `http://localhost:3000/studyflow.html`

### Adicionar Itens

1. Clique no botão **"+ Tarefa"**, **"+ Adicionar"** (em cada secção) ou use os botões específicos
2. Preencha o formulário:
   - **Título** (obrigatório)
   - **Descrição** (opcional)
   - **Disciplina** (opcional)
   - **Data** (obrigatório)
   - **Hora** (opcional)
   - **Prioridade** (Normal, Importante, Urgente)
   - **Progresso** (apenas para trabalhos, 0-100%)
3. Clique em **"Guardar"**

### Gerir Itens

- **Concluir**: Clique em "✅ Concluir" para marcar como concluído
- **Editar**: Clique em "✏️ Editar" para modificar um item
- **Remover**: Clique em "🗑️ Remover" para eliminar um item

### Vista Semanal

A vista semanal mostra todos os eventos da semana atual:
- **Ponto azul**: Tarefas
- **Ponto laranja**: Trabalhos
- **Ponto vermelho**: Testes
- O dia atual está destacado

## 💾 Armazenamento de Dados

Os dados são guardados automaticamente no **localStorage** do navegador. Isto significa que:
- ✅ Os dados persistem entre sessões
- ✅ Não precisa de servidor para funcionar
- ⚠️ Os dados são específicos do navegador/dispositivo
- ⚠️ Se limpar os dados do navegador, perderá a informação

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
- ✅ Vista semanal adaptável

### Preferências do Utilizador
- ✅ Respeita `prefers-reduced-motion`
- ✅ Suporte para modo escuro (`prefers-color-scheme: dark`)
- ✅ Suporte para alto contraste (`prefers-contrast: high`)

## 🔧 Personalização

### Cores
As cores podem ser alteradas modificando as variáveis CSS em `:root`:
```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
}
```

### Campos Adicionais
Para adicionar novos campos ao formulário:
1. Adicione o campo HTML no formulário do modal
2. Atualize a função `handleFormSubmit()` para incluir o novo campo
3. Atualize `createItemHTML()` para exibir o novo campo

## 📱 Navegação por Teclado

- **Tab**: Navegar entre elementos
- **Enter**: Submeter formulário ou ativar botão
- **Escape**: Fechar modal
- **Espaço**: Ativar botões

## 🆘 Resolução de Problemas

### Dados não são guardados
- Verifique se o navegador permite localStorage
- Não use modo privado/incógnito (pode limpar dados ao fechar)

### Vista semanal não atualiza
- Recarregue a página (F5)
- Verifique se há itens com datas válidas

### Modal não fecha
- Pressione **Escape**
- Clique fora do modal
- Clique no botão "Cancelar" ou "×"

## 🔄 Integração com MySQL (Opcional)

Para integrar com a base de dados MySQL existente:

1. Atualize as funções `saveData()` e `loadData()` para fazer chamadas à API
2. Use os endpoints existentes em `server.js` ou crie novos
3. Adicione autenticação se necessário

Exemplo de integração:
```javascript
async function saveData() {
    try {
        await fetch('/api/studyflow/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tasks: state.tasks,
                works: state.works,
                tests: state.tests
            })
        });
    } catch (error) {
        console.error('Erro ao guardar:', error);
        // Fallback para localStorage
        localStorage.setItem('studyflow_data', JSON.stringify(data));
    }
}
```

## 📚 Estrutura do Código

```
studyflow.html
├── HTML
│   ├── Header com logo e navegação
│   ├── Estatísticas
│   ├── Secções (Tarefas, Trabalhos, Testes)
│   ├── Vista Semanal (Sidebar)
│   └── Modal de formulário
├── CSS
│   ├── Variáveis e reset
│   ├── Layout responsivo
│   ├── Componentes (cards, buttons, forms)
│   └── Acessibilidade
└── JavaScript
    ├── Estado da aplicação
    ├── Funções de renderização
    ├── Gestão de dados (localStorage)
    └── Event handlers
```

## 🎯 Próximas Melhorias Possíveis

- [ ] Filtros por disciplina, prioridade ou data
- [ ] Notificações de prazos próximos
- [ ] Exportação de dados (PDF, CSV)
- [ ] Temas personalizáveis
- [ ] Sincronização entre dispositivos
- [ ] Integração com calendários externos
- [ ] Modo offline completo
- [ ] Gráficos de progresso

---

**Desenvolvido com foco em acessibilidade, usabilidade e eficiência** 🎓

