// Conteúdo do portfólio em um só lugar, para editar sem mexer nos componentes.

export const profile = {
  name: 'Felipe Lima',
  handle: 'felipe.lima',
  role: 'Automação & IA',
  location: 'São Paulo',
  company: 'Omni',
  lede:
    'Pego o trabalho manual que trava a operação e transformo em sistema que roda sozinho: robôs de RPA, agentes de IA e os produtos web em volta deles.',
  pipelines: [
    ['contrato.pdf', 'agente revisa cláusulas', 'parecer'],
    ['planilha manual', 'pipeline', 'dashboard executivo'],
  ],
  avatarLines: [
    'Oi! Eu sou o Felipe.',
    'Automatizo o que é repetitivo.',
    'Construo agentes de IA que trabalham junto com as pessoas.',
    'Hoje, IA e automação na Omni.',
    'Processo manual? Vira sistema.',
  ],
  links: {
    github: 'https://github.com/FelipeDev12Lima',
    linkedin: 'https://www.linkedin.com/in/felipe-lima-353343238/',
    email: 'felipe.lima.dev12@gmail.com',
  },
} as const

export const about = {
  statement:
    'Antes do código, passei por RH, mercado imobiliário e vendas, e em todo lugar acabava automatizando alguma coisa. Na Omni Conectado, entrei cuidando de uma loja e saí com o e-commerce que eu mesmo construí. Hoje sou desenvolvedor de automações inteligentes na Omni: robôs, agentes de IA e os sistemas em volta deles.',
  // Entrada → saída: cada par troca letra por letra durante o scroll
  swaps: [
    { input: 'contratos', output: 'pareceres', caption: 'agente de IA que revisa cláusula por cláusula' },
    { input: 'planilhas', output: 'dashboards', caption: 'dados soltos viram painel executivo' },
    { input: 'auditorias', output: 'relatórios', caption: 'testes de auditoria executados por IA' },
    { input: 'processos', output: 'produtos', caption: 'o que era manual vira sistema' },
  ],
} as const

export const services = [
  {
    tag: 'RPA',
    title: 'Automação de processos',
    body: 'Robôs para compliance e back-office, do desenho do processo à entrega. Integro sistemas legados e ERPs por API e coloco IA generativa nas etapas de validação, para a revisão manual virar exceção.',
    pipeline: ['cadastros com CPF, CNPJ e CEP', 'robô valida e cruza com o ERP', 'compliance sem revisão manual'],
    tools: ['UiPath', 'GenAI Activities', 'Python', 'APIs REST', 'Web Scraping', 'Excel VBA & Power Query'],
  },
  {
    tag: 'IA',
    title: 'Agentes de IA',
    body: 'Agentes que consultam dados em linguagem natural, leem documentos e sugerem decisões, com uma pessoa aprovando no fim. E pipelines RAG para buscar respostas na documentação da empresa.',
    pipeline: ['pergunta em linguagem natural', 'agente busca nos dados e documentos', 'resposta com a fonte'],
    tools: ['Copilot Studio', 'Power Platform', 'RAG', 'ChromaDB', 'Azure AI Foundry', 'MCP', 'GPT'],
  },
  {
    tag: 'WEB',
    title: 'Produtos web',
    body: 'As aplicações em volta de tudo isso: e-commerce integrado ao ERP, painéis de gestão, login corporativo e APIs. Do protótipo ao sistema em produção.',
    pipeline: ['ideia da área', 'protótipo validado', 'sistema em produção'],
    tools: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'Node.js', 'Supabase', 'Vercel'],
  },
] as const

// Ordem cronológica: a história termina no presente
export const career = [
  {
    year: 2014,
    period: '2014 – 2016',
    role: 'Técnico em Recursos Humanos',
    org: 'FMU',
    kind: 'formação',
    body: 'A primeira formação. Aprendi processo e gente antes de aprender código.',
    metrics: [],
  },
  {
    year: 2018,
    period: '2018 – 2020',
    role: 'Captador de Imóveis',
    org: 'Di Palma Campos',
    kind: 'trabalho',
    body: 'Captação de imóveis e otimização de SEO do conteúdo: meu primeiro contato com a web.',
    metrics: [],
  },
  {
    year: 2020,
    period: 'mar – out 2020',
    role: 'Vendedor Jr.',
    org: 'Express Medical',
    kind: 'trabalho',
    body: 'Entrei para vender e acabei automatizando os relatórios de CRM do time.',
    metrics: [{ value: 40, prefix: '−', suffix: '%', label: 'no tempo de elaboração dos relatórios' }],
  },
  {
    year: 2020,
    period: 'dez 2020 – mar 2026',
    role: 'Responsável de Loja / Desenvolvedor',
    org: 'Omni Conectado',
    kind: 'trabalho',
    body: 'Cuidava da loja e construí o site e o e-commerce, integrados ao ERP com estoque, pedidos e faturamento sincronizados. Os relatórios de gestão também viraram automação.',
    metrics: [
      { value: 75, prefix: '+', suffix: '%', label: 'em vendas online' },
      { value: 90, prefix: '−', suffix: '%', label: 'em rupturas de estoque' },
    ],
  },
  {
    year: 2026,
    period: 'abr 2026 – hoje',
    role: 'Desenvolvedor de Automações Inteligentes',
    org: 'Omni S.A.',
    kind: 'atual',
    body: 'Robôs UiPath para compliance e back-office, IA generativa nas etapas de validação, agentes no Copilot Studio e pipelines RAG sobre a documentação técnica.',
    metrics: [],
  },
] as const

export const education = [
  'Análise e Desenvolvimento de Sistemas — FMU',
  'Java com Orientação a Objetos',
  'Java + Spring Data JPA',
  'HTML, CSS e JavaScript',
  'SQL avançado',
  'Cloud Computing: AWS',
] as const

// Projetos da Omni aparecem sem nomes internos nem dados da empresa
export const projects = [
  {
    title: 'Revisão de contratos com IA',
    context: 'Omni · uso interno',
    summary: 'Agente que lê o contrato, analisa cláusula por cláusula e aponta riscos e divergências para o jurídico.',
    pipeline: ['contrato em PDF', 'agente analisa cada cláusula', 'parecer para o jurídico'],
    stack: ['React', 'Supabase Edge Functions', 'IA generativa', 'Confluence API'],
  },
  {
    title: 'Auditoria interna automatizada',
    context: 'Omni · uso interno',
    summary: 'Os testes de auditoria que eram feitos à mão agora rodam por amostra, com a IA conferindo as evidências e sinalizando o que está incompleto.',
    pipeline: ['evidências da auditoria', 'IA executa os testes', 'relatório com alertas'],
    stack: ['React', 'Supabase', 'IA generativa', 'Relatório em áudio'],
  },
  {
    title: 'Plataforma de carreira',
    context: 'Omni · uso interno',
    summary: 'Plataforma de RH para a jornada de carreira: ciclos de avaliação, feedbacks, 1:1, metas, calendário corporativo e painéis para líderes.',
    pipeline: ['colaborador e líder', 'ciclos, metas e feedbacks', 'painel de pessoas'],
    stack: ['React', 'TypeScript', 'Supabase', 'Microsoft Entra'],
  },
  {
    title: 'Estúdio de apresentações com IA',
    context: 'Omni · uso interno',
    summary: 'Chat com agentes corporativos e um estúdio que monta slides no padrão visual da empresa, pronto para exportar.',
    pipeline: ['pedido em linguagem natural', 'agente monta os slides', 'apresentação no padrão'],
    stack: ['React', 'Azure AI Foundry', 'Copilot Studio', 'Geração de imagem'],
  },
  {
    title: 'App do nosso casamento',
    context: 'Pessoal',
    summary: 'Os convidados enviam fotos pelo celular lendo um QR code, e um modo apresentação exibe tudo no telão durante a festa.',
    pipeline: ['convidado lê o QR code', 'foto enviada e comprimida', 'exibida no telão'],
    stack: ['Next.js', 'Firebase', 'PWA', 'QR Code'],
  },
  {
    title: 'Site para escritório de advocacia',
    context: 'Cliente',
    summary: 'Site institucional com animações de scroll, ajustado direto com a cliente até a versão final.',
    pipeline: ['briefing da cliente', 'design e animações', 'site no ar'],
    stack: ['React', 'Vite', 'Framer Motion', 'Lenis'],
  },
] as const

export const moreProjects = [
  { title: 'Autorizador de acordos', note: 'Motor de regras com IA que sugere a autorização de acordos.', tag: 'IA' },
  { title: 'Credenciamento de eventos', note: 'Busca de convidados, QR code e impressão de crachás na entrada.', tag: 'Web' },
  { title: 'Framework base de aplicações', note: 'Login Microsoft, permissões, auditoria e design system para os apps internos.', tag: 'Web' },
  { title: 'Servidor MCP de nomenclatura', note: 'Padrão de nomes para recursos Azure, consultável por agentes de IA.', tag: 'IA' },
  { title: 'E-commerce integrado ao ERP', note: 'Estoque, pedidos e faturamento sincronizados automaticamente.', tag: 'Web' },
  { title: 'Dashboard executivo', note: 'Painel sobre planilhas com atualização automática e exportação em PDF.', tag: 'Dados' },
  { title: 'fefs.treino', note: 'App de treino que funciona offline, com timer de descanso e histórico de carga.', tag: 'Pessoal' },
] as const

export const stack = [
  { group: 'Automação', tools: ['UiPath', 'GenAI Activities', 'Python', 'APIs REST', 'Web Scraping', 'Excel VBA', 'Power Query'] },
  { group: 'IA & Agentes', tools: ['GPT', 'Copilot Studio', 'Power Platform', 'RAG', 'ChromaDB', 'Azure AI Foundry', 'MCP'] },
  { group: 'Web', tools: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'FastAPI', 'HTML & CSS'] },
  { group: 'Dados & Infra', tools: ['SQL', 'Supabase', 'Firebase', 'Java', 'Git & GitHub', 'Vercel', 'AWS'] },
] as const

export const navItems = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'o-que-faco', label: 'O que faço' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'stack', label: 'Stack' },
  { id: 'contato', label: 'Contato' },
] as const
