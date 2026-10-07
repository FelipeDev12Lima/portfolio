// Conteúdo da página de trajetória (/jornada), separado do profile.ts por ser
// uma narrativa própria para apresentação corporativa, não o portfólio público.
//
// Importante: isto é material de apoio visual para uma apresentação ao vivo —
// marcadores/palavras-chave, não o texto da fala. Evitar frases completas que
// dupliquem o que será narrado.

export const jornada = {
  kicker: 'Jornada · Omni',
  title: 'De primeiro colaborador da Boutique a Automação Inteligente.',
  lede: 'Dezembro de 2020 até hoje, em poucas marcas.',
  avatarLines: ['Minha trajetória na Omni.', 'Role para acompanhar.'],
} as const

export const chapters = [
  {
    year: 2020,
    period: 'dez 2020',
    label: 'O começo',
    title: 'Primeiro colaborador da Boutique Omni',
    paragraphs: ['Processos manuais, muita planilha', 'Sem site, sem sistema', 'Primeiras automações'],
  },
] as const

export const turningPoint = {
  year: 2023,
  period: 'final de 2023',
  label: 'A virada',
  quote: 'Eu quero trabalhar com tecnologia.',
  paragraphs: [
    'Conversa com o Paulo',
    'Carreira guiada por oportunidades',
    'Escolher o próprio caminho',
    'Apoio imediato',
  ],
} as const

export const learning = {
  year: 2024,
  period: '2024',
  label: 'Aprender fazendo',
  title: 'Teoria e prática lado a lado',
  paragraphs: ['Faculdade + rotina na Boutique', 'Aplicar na prática o que aprendia', 'Vocabulário novo: deploy, ambiente, versionamento'],
} as const

export const mentorsIntro = {
  label: 'Mentores',
  title: 'Pedi ajuda antes de existir vaga',
  body: 'Uma manhã por semana, acompanhando o time de tecnologia.',
} as const

export const mentors = [
  { name: 'Celso', role: 'Suporte', note: 'Mentorias semanais' },
  { name: 'Felipe Barreto', role: 'Tech Lead Java', note: 'Vocabulário técnico' },
  { name: 'Paulo', role: 'Meu líder na época', note: 'Apoio desde o início' },
  { name: 'RH', role: 'Parceiro de carreira', note: 'Guia do processo' },
  { name: 'Henrique Prado', role: 'Meu líder hoje', note: 'Indicação para a vaga' },
] as const

export const preparation = {
  year: 2025,
  period: '2024 – 2025',
  label: 'Carreira ON & preparação',
  title: 'PDI como guia da transição',
  paragraphs: ['Carreira ON + PDI: metas e mentorias', 'Omni Universidade — treinamento de RPA', 'Comunicar objetivos abertamente'],
} as const

export const opportunity = {
  year: 2026,
  period: '1º abr 2026',
  label: 'A oportunidade',
  title: 'Processo seletivo, como qualquer candidato',
  paragraphs: ['Henrique acompanha o Carreira ON', 'Entrevistas e etapas normais', '1º abr 2026 — Automação Inteligente'],
} as const

export const closing = {
  label: 'Hoje',
  title: 'Eu não cheguei perdido.',
  paragraphs: ['Ambiente e pessoas já conhecidos', 'Contribuindo desde o início', 'Projetos, frentes e treinamentos'],
  quote: 'Exatamente na área que sonhava.',
  footnote: 'Carreira ON: de vontade a plano real.',
} as const
