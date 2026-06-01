# CLAUDE.md — Ordenação Dashboard (Zion Church)

## Visão geral do projeto

Dashboard web para acompanhamento e avaliação dos processos de ordenação da Zion Church, com duas modalidades distintas: Ordenação Pastoral e Ordenação Presbiteral. Permite que coordenadores registrem entregas, escrevam revisões e acompanhem o progresso de cada candidato. Candidatos podem acessar sua própria visão somente leitura via URL única.

## Stack tecnológica

- **Framework:** React 18 + Vite + TypeScript
- **Estilização:** Tailwind CSS
- **Banco de dados:** Firebase Firestore
- **Roteamento:** React Router v6
- **Feedback:** react-hot-toast
- **Deploy:** GitHub Pages via GitHub Actions

## Identidade visual

- **Cor primária:** teal/turquesa — `#0D9488` (Tailwind: `teal-600`)
- **Paleta de suporte:** branco, cinzas neutros, sem gradientes, sem sombras pesadas
- **Tipografia:** Inter (system font stack como fallback)
- **Estilo:** flat, limpo, profissional — sem efeitos decorativos

## Firebase

- **Projeto:** `ordenacao-dashboard`
- **Credenciais:** via variáveis de ambiente (`.env`) — nunca hardcodar no código
- **Regras de segurança:** Firestore em modo leitura pública para candidatos (read), escrita restrita via senha de coordenador no client

## Estrutura de dados

### Coleção `candidatos`
```ts
{
  id: string
  nome: string
  modalidade: "pastoral" | "presbiteral"
  localidade: string
  dataInicio: Timestamp
  status: "em_andamento" | "aprovado" | "reprovado" | "suspenso"
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### Subcoleção `candidatos/{id}/entregas`
```ts
{
  id: string
  secao: string
  status: "pendente" | "em_andamento" | "entregue" | "aprovado" | "reprovado"
  nota: NotaConceito | null   // null para Jejum e Oração e entregas não avaliadas
  notaRevisao: string         // revisão detalhada — visível ao candidato
  observacoes: string         // notas internas — somente coordenadores
  dataEntrega: Timestamp | null
  dataAvaliacao: Timestamp | null
  avaliador: string
  updatedAt: Timestamp
}

type NotaConceito = "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D"
```

## Seções de entrega por modalidade

### Ordenação Presbiteral (8 entregas)
1. Trabalho Escrito — Teologia Sistemática
2. Trabalho Escrito — Princípios da Doutrina Cristã
3. Trabalho Escrito — História da Igreja
4. Trabalho Escrito — Análise Pessoal
5. Trabalho Escrito — Leitura e Resumo de Livros (7 livros)
6. Trabalho Escrito — Cosmovisão Bíblica
7. Jejum e Oração (21 dias)
8. Sabatina com a Banca Pastoral

### Ordenação Pastoral (9 entregas)
1. Trabalho Escrito — Teologia Sistemática
2. Trabalho Escrito — Princípios da Doutrina Cristã
3. Trabalho Escrito — História da Igreja
4. Trabalho Escrito — Análise Pessoal
5. Trabalho Escrito — Leitura e Resumo de Livros (16 livros)
6. Trabalho Escrito — Cosmovisão Bíblica
7. Trabalho Escrito — Cronograma e Prazos de Entrega
8. Jejum e Oração (40 dias)
9. Sabatina com a Banca Pastoral

## Sistema de notas

Conceitos válidos em ordem decrescente:
`A+` `A` `A-` `B+` `B` `B-` `C+` `C` `C-` `D`

### Cores por conceito
| Conceito | Cor |
|----------|-----|
| A+, A, A- | verde — `teal-600` |
| B+, B, B- | azul — `blue-600` |
| C+, C, C- | amarelo — `yellow-600` |
| D | vermelho — `red-600` |

### Regras de negócio
- Jejum e Oração **não recebe nota** — campo sempre oculto, status máximo é `"concluído"`
- Entrega considerada **aprovada** para fins de progresso: qualquer nota diferente de `null` e diferente de `"D"`
- **Conceito predominante** (sidebar): conceito mais frequente entre entregas avaliadas
- **Conceito mais baixo** (sidebar): pior conceito entre entregas avaliadas

## Cálculo de progresso

- Progresso geral = % de entregas aprovadas sobre o total de entregas que aceitam nota (exclui Jejum e Oração)
- Cor da barra: vermelho `< 40%`, amarelo `40–79%`, verde `≥ 80%`

## Controle de acesso

O sistema usa controle de acesso simples baseado em sessionStorage, sem autenticação Firebase:

- **Coordenador:** acessa `/admin` com senha definida em `VITE_ADMIN_PASSWORD`; flag salvo em `sessionStorage` libera todas as rotas protegidas
- **Candidato:** acessa `/candidato/:id` com o ID do Firestore; vê apenas as próprias seções, somente leitura, sem observações internas

### O que cada perfil vê

| Campo                | Coordenador | Candidato  |
|----------------------|:-----------:|:----------:|
| Nome da seção        | ✓           | ✓          |
| Status               | ✓ (editar)  | ✓ (ver)    |
| Nota (conceito)      | ✓ (editar)  | ✓ (ver)    |
| Revisão do trabalho  | ✓ (editar)  | ✓ (ver)    |
| Observações internas | ✓ (editar)  | ✗          |
| Dados de outros      | ✓           | ✗          |

## Convenções de código

- Componentes em `PascalCase`, arquivos `.tsx`
- Hooks customizados em `camelCase` com prefixo `use`, arquivos `.ts`
- Tipos e interfaces em `src/types/index.ts`
- Funções Firebase isoladas em `src/lib/firebase.ts`
- Constantes (seções por modalidade, notas, cores) em `src/lib/constants.ts`
- Sem `any` — tipar tudo com as interfaces de `src/types/index.ts`
- Salvar no Firestore de forma otimista: atualiza estado local imediatamente, persiste em background, reverte com toast de erro se falhar

## Estrutura de pastas

```
src/
  components/
    ui/           # Badge, Button, Toast, ProgressBar, Skeleton, EmptyState
    candidato/    # CandidatoCard, NovoCandidatoModal
    entrega/      # EntregaCard
  pages/
    HomePage.tsx
    DashboardPage.tsx
    CandidatoPage.tsx
    AdminLoginPage.tsx
  hooks/
    useCandidatos.ts
    useEntregas.ts
    useAuth.ts
  lib/
    firebase.ts
    constants.ts  # SECOES_PRESBITERAL, SECOES_PASTORAL, NOTAS_CONCEITO, NOTA_COR
  types/
    index.ts
```

## Variáveis de ambiente

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_ADMIN_PASSWORD
```

Nunca commitar o `.env`. O `.env.example` deve existir no repositório com os campos sem valores.

## Deploy

- **Plataforma:** GitHub Pages
- **Branch de deploy:** `gh-pages`
- **Trigger:** push na `main`
- **Workflow:** `.github/workflows/deploy.yml` com GitHub Actions
- Configurar `base` no `vite.config.ts` com o nome do repositório

## Comportamentos importantes

- Ao criar um candidato, inicializar automaticamente todas as entregas da modalidade com status `"pendente"` e `nota: null`
- Alterar status para `"reprovado"` ou `"suspenso"` deve exigir confirmação explícita
- Loading skeletons enquanto carrega dados do Firestore
- Tela de estado vazio quando não há candidatos cadastrados
- Salvar deve ser otimista: atualiza a UI imediatamente e persiste no Firestore em background, mostrando toast de erro se falhar