# felipe.lima — portfólio

Portfólio pessoal de Felipe Lima, desenvolvedor de automação e IA.

## Rodando

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm run build    # build de produção em dist/
npm run preview  # serve o build
```

## Estrutura

```
src/
├── components/
│   ├── Boot/       # loading em formato de log de terminal (uma vez por sessão)
│   ├── Navbar/     # navegação, tema claro/escuro e menu do celular
│   ├── Hero/       # "Processos → produtos." + avatar; letras se desfazem no scroll
│   ├── Avatar/     # retrato interativo: inclinação 3D, piscar, balão no clique
│   ├── About/      # parágrafo que acende + troca de palavras letra por letra (fixa)
│   ├── Services/   # "O que faço": cartões que se empilham
│   ├── Career/     # trajetória com ano em odômetro e números que contam
│   ├── Projects/   # trilha horizontal fixa no desktop, lista no celular
│   ├── Stack/      # faixas de tipografia presas ao scroll + lista por frente
│   ├── Contact/    # título que se monta no scroll, e-mail e links
│   └── Footer/
├── data/profile.ts # todo o conteúdo do site (textos, projetos, carreira, links)
├── hooks/          # useTheme, useReducedMotion, useSmoothScroll (Lenis)
├── lib/gsap.ts     # GSAP + ScrollTrigger + SplitText registrados
├── styles/         # tokens (cores/fontes), global e peças comuns das seções
└── assets/avatar/  # retrato recortado (WebP) + pálpebras para a piscada
design/             # arquivos-fonte do avatar e a proposta visual
```

## Animações

Todas as animações de scroll ficam dentro de `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`.
Quem ativa "reduzir movimento" no sistema vê o conteúdo completo e parado, sem seções fixas.

Para editar textos, mexa só em `src/data/profile.ts`.

## Identidade

- **Cores:** cinza de estúdio `#ECEEF1` e cobalto `#2B4BFF` (tema escuro `#101216` / `#7087FF`).
- **Fontes:** Anybody (títulos, com eixo de largura variável), Hanken Grotesk (texto) e IBM Plex Mono (logs e rótulos).

## Créditos

Inspirado na experiência de [moncy.dev](https://www.moncy.dev/). Todo o código, o design e os assets deste repositório são originais.
