# Interface de Login Acessível

Esta interface de login foi desenvolvida seguindo as melhores práticas de **acessibilidade (WCAG 2.1)** e **experiência do utilizador (UX)** para garantir que seja funcional para todas as pessoas.

## 🎯 Normas e Práticas Implementadas

### 1. **Acessibilidade (WCAG 2.1)**

#### Semântica HTML
- ✅ Uso de elementos semânticos (`<main>`, `<header>`, `<form>`, `<label>`)
- ✅ Estrutura lógica e hierárquica do conteúdo
- ✅ Atributos ARIA apropriados (`aria-label`, `aria-required`, `aria-invalid`, `aria-describedby`)

#### Navegação por Teclado
- ✅ Todos os elementos interativos são acessíveis via teclado
- ✅ Indicadores de foco visíveis (`:focus-visible`)
- ✅ Ordem de tabulação lógica
- ✅ Suporte completo para navegação sem rato

#### Leitores de Ecrã
- ✅ Labels associados a todos os campos
- ✅ Mensagens de erro anunciadas em tempo real (`aria-live="polite"`)
- ✅ Atributos `aria-describedby` para associar ajuda e erros aos campos
- ✅ Textos alternativos para elementos visuais

#### Contraste e Visibilidade
- ✅ Contraste mínimo de 4.5:1 para texto normal
- ✅ Contraste mínimo de 3:1 para texto grande
- ✅ Suporte para modo de alto contraste (`@media (prefers-contrast: high)`)
- ✅ Indicadores visuais claros para estados (foco, erro, sucesso)

### 2. **Validação de Formulário**

#### Validação em Tempo Real
- ✅ Validação durante a digitação (`input` event)
- ✅ Validação ao sair do campo (`blur` event)
- ✅ Mensagens de erro claras e específicas
- ✅ Indicadores visuais de campos válidos/inválidos

#### Validação de Email
- ✅ Verificação de formato válido (regex)
- ✅ Mensagem de erro específica
- ✅ Atributo `type="email"` para validação nativa do navegador

#### Validação de Senha
- ✅ Mínimo de 8 caracteres
- ✅ Indicador visual de força da senha
- ✅ Feedback em tempo real sobre a segurança

### 3. **Experiência do Utilizador (UX)**

#### Design Moderno e Limpo
- ✅ Interface visualmente atraente
- ✅ Espaçamento adequado entre elementos
- ✅ Tipografia legível e hierarquia clara
- ✅ Cores consistentes e profissionais

#### Feedback Visual
- ✅ Estados de hover, focus e active bem definidos
- ✅ Transições suaves (respeitando `prefers-reduced-motion`)
- ✅ Mensagens de sucesso e erro claras
- ✅ Indicador de carregamento durante submissão

#### Responsividade
- ✅ Design adaptável a diferentes tamanhos de ecrã
- ✅ Layout otimizado para dispositivos móveis
- ✅ Texto e elementos redimensionáveis

### 4. **Segurança**

#### Boas Práticas
- ✅ Atributo `autocomplete` apropriado
- ✅ Tipo de input correto (`email`, `password`)
- ✅ Validação tanto no cliente quanto preparada para servidor
- ✅ Prevenção de submissão dupla

### 5. **Performance e Acessibilidade Avançada**

#### Preferências do Utilizador
- ✅ Respeita `prefers-reduced-motion` (animações reduzidas)
- ✅ Suporte para modo escuro (`prefers-color-scheme: dark`)
- ✅ Suporte para alto contraste (`prefers-contrast: high`)

#### Acessibilidade de Conteúdo
- ✅ Textos de ajuda para cada campo
- ✅ Indicadores de campos obrigatórios
- ✅ Links com texto descritivo
- ✅ Mensagens de erro específicas e acionáveis

## 📋 Checklist de Acessibilidade

- [x] Todos os campos têm labels associados
- [x] Campos obrigatórios estão claramente marcados
- [x] Mensagens de erro são anunciadas por leitores de ecrã
- [x] Navegação completa por teclado
- [x] Contraste adequado em todos os elementos
- [x] Foco visível em todos os elementos interativos
- [x] Formulário funciona sem JavaScript (validação HTML5)
- [x] Textos alternativos para elementos visuais
- [x] Estrutura semântica correta
- [x] Suporte para diferentes preferências do utilizador

## 🚀 Como Usar

1. Abra o ficheiro `index.html` num navegador moderno
2. Preencha os campos de email e palavra-passe
3. Observe a validação em tempo real
4. Teste a navegação apenas com teclado (Tab, Enter, Shift+Tab)
5. Teste com um leitor de ecrã (NVDA, JAWS, VoiceOver)

## 🧪 Testes Recomendados

### Testes de Acessibilidade
- ✅ Navegação apenas com teclado
- ✅ Teste com leitor de ecrã (NVDA/JAWS/VoiceOver)
- ✅ Verificação de contraste (ferramentas como WebAIM Contrast Checker)
- ✅ Validação com WAVE ou axe DevTools

### Testes de Funcionalidade
- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de email
- ✅ Validação de comprimento de senha
- ✅ Submissão do formulário
- ✅ Mensagens de erro e sucesso

## 📚 Recursos Adicionais

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM - Web Accessibility In Mind](https://webaim.org/)
- [MDN - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)

## 🔧 Personalização

Para adaptar esta interface às suas necessidades:

1. **Cores**: Modifique as variáveis CSS em `:root`
2. **Validação**: Ajuste as funções de validação no JavaScript
3. **API**: Substitua `simulateLogin()` pela sua chamada real à API
4. **Mensagens**: Personalize as mensagens de erro e sucesso

---

**Desenvolvido com foco em acessibilidade e inclusão digital** ♿️
