# Portfólio Profissional — Full Stack Developer

> Portfólio moderno e de alto padrão (Dark Premium) com demonstrações técnicas interativas ao vivo e suporte bilíngue nativo (Português & Inglês).

---

## 1. Objetivo do Projeto

O objetivo deste projeto é fornecer uma vitrine técnica completa e interativa para um **Desenvolvedor Full Stack**, destacando competências em:
- **Desenvolvimento Web Moderno** (Next.js, React, Tailwind CSS, TypeScript)
- **Backend & APIs com Python** (FastAPI, RESTful APIs, Arquitetura Limpa)
- **Bancos de Dados SQL** (MySQL, SQLite, Modelagem Relacional)
- **Automações e Integrações Empresariais** (WhatsApp Business API, Webhooks, Processamento de Dados)
- **Sistemas Personalizados sob demanda** (Dashboards, CRUDs com regras de negócio complexas)

O diferencial central é a **experiência prática**: os visitantes não apenas leem sobre os projetos, mas podem **interagir com sistemas simulados, inspecionar payloads de automações e navegar em visualizações de sites ao vivo** sem sair do portfólio.

---

## 2. Tecnologias Utilizadas

- **Framework Web**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Linguagem**: [TypeScript 5](https://www.typescriptlang.org/) (Tipagem estrita)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/) com paleta *Dark Premium*
- **Ícones**: [Lucide React](https://lucide.dev/) e vetores SVG personalizados
- **Internacionalização**: Sistema sob medida com suporte a `pt-BR` e `en`, alternador dinâmico e persistência via `localStorage`
- **Renderização e Demonstrações**: Componentes isolados em React com *Lazy Loading* e *Suspense*

---

## 3. Estrutura de Diretórios

```
portfolio_pessoal/
├── public/
│   └── images/
│       └── projects/          # Capas e mockups dos projetos (SVGs e imagens)
├── src/
│   ├── app/
│   │   ├── globals.css        # Variáveis de cor Dark Premium e estilos globais
│   │   ├── layout.tsx         # Layout raiz com fontes Geist e ClientProviders
│   │   ├── page.tsx           # Página inicial com todas as seções
│   │   └── projects/[id]/     # Página de Estudo de Caso individual
│   ├── components/
│   │   ├── demos/             # Renderizador e molduras de demonstração
│   │   │   ├── DemoRenderer.tsx
│   │   │   ├── LiveWebsiteDemo.tsx
│   │   │   └── GalleryDemo.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx     # Menu sticky com alternador PT/EN e menu mobile
│   │   │   └── Footer.tsx     # Rodapé institucional com links e scroll-to-top
│   │   ├── project/
│   │   │   └── ProjectCaseStudy.tsx # Layout do estudo de caso completo
│   │   ├── providers/
│   │   │   └── ClientProviders.tsx # Provedor de contexto de idioma
│   │   ├── sections/          # Seções da página inicial
│   │   │   ├── Hero.tsx       # Dobra principal com terminal interativo
│   │   │   ├── About.tsx      # Seção "Além do código"
│   │   │   ├── Services.tsx   # As 4 áreas de atuação
│   │   │   ├── Projects.tsx   # Vitrine interativa com filtros
│   │   │   ├── TechStack.tsx  # Stack tecnológica categorizada
│   │   │   ├── Process.tsx    # 5 etapas (Discovery ao Delivery)
│   │   │   └── Contact.tsx    # Chamada com botão direto do WhatsApp
│   │   └── ui/
│   │       ├── Icons.tsx      # SVGs consistentes (GitHub, LinkedIn, etc.)
│   │       └── SectionLabel.tsx # Badge com indicador de seção
│   ├── data/
│   │   ├── index.ts           # Barrel export de dados
│   │   ├── site-config.ts     # Configurações pessoais centralizadas
│   │   ├── projects.ts        # Base de dados tipada dos projetos
│   │   ├── services.ts        # As 4 áreas de atuação
│   │   ├── technologies.ts    # Stack de tecnologias
│   │   ├── process.ts         # Etapas do fluxo de trabalho
│   │   └── navigation.ts      # Itens de menu e filtros
│   ├── demos/                 # Demonstrações interativas avançadas
│   │   ├── systems/
│   │   │   └── FleetManagementDemo.tsx # Sistema de Gestão de Frota interativo
│   │   └── automations/
│   │       └── WhatsAppAutomationDemo.tsx # Simulador visual do fluxo WhatsApp
│   ├── i18n/
│   │   ├── context.tsx        # Context API para gerenciamento de idioma
│   │   ├── translations.ts    # Dicionário de traduções (PT e EN)
│   │   └── index.ts
│   └── types/
│       └── index.ts           # Interfaces e definições TypeScript
├── package.json
├── tsconfig.json
└── README.md
```

---

## 4. Instalação

### Pré-requisitos
- **Node.js**: versão 18.17 ou superior (recomendado 20 LTS ou superior)
- **npm** ou **yarn** ou **pnpm**

### Passo a passo
1. Clone ou acerte o diretório do projeto:
```bash
cd portfolio_pessoal
```

2. Instale as dependências:
```bash
npm install
```

---

## 5. Execução Local

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra seu navegador em [http://localhost:3000](http://localhost:3000).

O site já possui suporte a Hot Reloading, alternância de idioma e execução instantânea das demonstrações interativas.

---

## 6. Configuração dos Dados Pessoais

Todos os seus dados de contato e identificação estão centralizados no arquivo:
`src/data/site-config.ts`

```typescript
export const siteConfig: SiteConfig = {
  name: 'Julio Carneiro',
  title: {
    pt: 'Julio Carneiro — Full Stack Developer',
    en: 'Julio Carneiro — Full Stack Developer',
  },
  description: {
    pt: 'Desenvolvedor Full Stack especializado em aplicações web, sistemas personalizados, Python Backend, APIs e automações empresariais.',
    en: 'Full Stack Developer specialized in web applications, custom systems, Python Backend, APIs and business automations.',
  },
  available: true,
  contact: {
    whatsapp: '5564999032384',
    email: '',
    github: 'julioccr160908-jpg',
    linkedin: 'julio-carneiro-dev',
  },
  profileImage: '/images/profile.jpg',
};
```

---

## 7. Cadastro de Novos Projetos

Para adicionar um novo projeto ao portfólio, edite o arquivo `src/data/projects.ts` e adicione um novo objeto ao array `projects`:

```typescript
{
  id: 'meu-novo-projeto',
  title: {
    pt: 'Nome do Projeto em Português',
    en: 'Project Name in English'
  },
  category: 'system', // 'landing-page' | 'website' | 'system' | 'backend-api' | 'automation'
  shortDescription: {
    pt: 'Breve descrição de uma linha.',
    en: 'Short one-line description.'
  },
  description: {
    pt: 'Descrição detalhada do projeto para o card e visão geral.',
    en: 'Detailed project description for card and overview.'
  },
  coverImage: '/images/projects/meu-projeto-cover.svg',
  technologies: ['Python', 'FastAPI', 'MySQL', 'Next.js'],
  demo: {
    type: 'component', // 'iframe' | 'component' | 'simulation' | 'gallery'
    component: 'MeuComponenteDemo' // Nome do componente registrado no DemoRenderer
  },
  links: {
    github: 'https://github.com/...', // opcional
    live: 'https://meuprojeto.com'    // opcional
  },
  caseStudy: {
    challenge: {
      pt: 'Qual problema o cliente ou empresa enfrentava...',
      en: 'What problem the company was facing...'
    },
    solution: {
      pt: 'Qual foi a abordagem técnica escolhida...',
      en: 'What technical approach was chosen...'
    },
    features: [
      {
        title: { pt: 'Funcionalidade 1', en: 'Feature 1' },
        description: { pt: 'Detalhes da funcionalidade', en: 'Feature details' }
      }
    ],
    architecture: {
      frontend: ['Next.js', 'Tailwind CSS'],
      backend: ['Python', 'FastAPI'],
      database: ['MySQL', 'SQLAlchemy'],
      apis: ['REST API']
    }
  },
  featured: true,
  order: 4
}
```

---

## 8. Cadastro de Imagens

1. Salve as imagens do projeto (capturas de tela, mockups ou ilustrações) no diretório `public/images/projects/`.
2. Formatos recomendados: `.webp`, `.svg` ou `.png` otimizados.
3. No arquivo `src/data/projects.ts`, aponte para o caminho absoluto:
   `coverImage: '/images/projects/nome-do-arquivo.svg'`

---

## 9. Criação de Demonstrações Interativas

O portfólio aceita **4 modalidades de demonstração**:

### A. Live Website (`type: 'iframe'`)
Para sites publicados com permissão de embedding:
```typescript
demo: {
  type: 'iframe',
  url: 'https://seusite.com'
}
```
*Se a URL for omitida ou o site bloquear iframe por CSP, uma prévia moderna e responsiva de alta fidelidade é exibida automaticamente.*

### B. Interactive System Demo (`type: 'component'`)
Para dashboards administrativos e sistemas operacionais em React:
1. Crie o componente em `src/demos/systems/MeuSistemaDemo.tsx`.
2. Registre-o com `React.lazy` no `src/components/demos/DemoRenderer.tsx`.
3. Configure `demo: { type: 'component', component: 'MeuSistemaDemo' }`.

### C. Automation Simulator (`type: 'simulation'`)
Para fluxos assíncronos, Webhooks, APIs e bots:
1. Crie o componente em `src/demos/automations/MinhaAutomacaoDemo.tsx`.
2. O simulador ilustra a jornada da mensagem, payload JSON de eventos e resposta.
3. Configure `demo: { type: 'simulation', component: 'MinhaAutomacaoDemo' }`.

### D. Visual Gallery (`type: 'gallery'`)
Para exposições de imagens em alta definição com zoom e lightbox:
```typescript
demo: {
  type: 'gallery',
  images: [
    { src: '/images/projects/print1.png', alt: { pt: 'Tela Inicial', en: 'Home Screen' } },
    { src: '/images/projects/print2.png', alt: { pt: 'Relatórios', en: 'Reports' } }
  ]
}
```

---

## 10. Configuração de Idiomas

O sistema bilíngue é gerenciado por:
- `src/i18n/translations.ts`: Dicionário com todas as chaves em `pt` e `en`.
- `src/i18n/context.tsx`: Contexto React que persiste a escolha do usuário no `localStorage`.
- Função `t(localizedString, locale)`: Extrai o texto correto de acordo com a seleção atual.

Para adicionar novas traduções, basta incluir o par `{ pt: '...', en: '...' }` no dicionário.

---

## 11. Build de Produção

Para validar todos os tipos TypeScript e gerar as páginas estáticas pré-renderizadas:

```bash
npm run build
```

O comando executará o Turbopack, checará a tipagem e compilará todos os estudos de caso estaticamente.

Para testar o build localmente em modo de produção:
```bash
npm run start
```

---

## 12. Deploy

### Deploy na Vercel (Recomendado)
1. Suba o repositório para o seu GitHub.
2. Acesse [vercel.com](https://vercel.com) e importe o repositório.
3. O Next.js será detectado automaticamente.
4. Clique em **Deploy**.

### Deploy em VPS / Docker
Você também pode gerar um build standalone no `next.config.ts` (`output: 'standalone'`) e rodar via Docker ou gerenciador PM2.

---

## Licença

Projeto desenvolvido para fins de portfólio profissional. Todos os direitos reservados a **Julio Carneiro**.
