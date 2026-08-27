# MAC Pinheiros Landing Page

Landing page estatica para campanhas de Google Ads com conversao principal via WhatsApp.

## Como executar localmente

Abra `index.html` diretamente no navegador ou suba um servidor estatico:

```bash
npx serve .
```

Como a pagina usa JavaScript como modulo (`type="module"`), o servidor estatico e o caminho mais confiavel para testar todos os navegadores.

## Onde alterar o WhatsApp

Edite `src/config/site-config.js`:

```js
export const WHATSAPP_NUMBER = "INSERIR_NUMERO_AQUI";
```

Use somente numeros, com DDI e DDD. Exemplo:

```js
export const WHATSAPP_NUMBER = "5511999999999";
```

Todos os CTAs usam essa configuracao.

## Onde atualizar precos e dados comerciais

Edite `src/config/site-config.js`, principalmente:

- `COMMERCIAL.startingPrices`
- `COMMERCIAL.priceNotice`
- `UNIT_TYPES`

Os valores atuais foram extraidos da tabela oficial `TV MAC PINHEIROS 08.26.pdf`, gerada em `01/08/2026 09:09:17`.

## Google Tag Manager e Google Ads

Edite `TRACKING` em `src/config/site-config.js`:

```js
export const TRACKING = {
  GOOGLE_TAG_MANAGER_ID: "",
  GOOGLE_ADS_ID: "",
};
```

Os cliques de WhatsApp ja disparam eventos no `dataLayer`:

- `whatsapp_click`
- `whatsapp_hero_click`
- `whatsapp_units_click`
- `whatsapp_sticky_click`

## Como gerar build

Nao ha etapa de build obrigatoria. A pagina foi feita com HTML, CSS e JavaScript estatico.

Para publicar, envie estes arquivos e pastas:

- `index.html`
- `src/`
- `assets/`

## Como publicar gratuitamente

Opcoes simples:

- Netlify: arraste a pasta do projeto ou conecte um repositorio.
- Cloudflare Pages: configure como site estatico, sem comando de build.
- Vercel: importe a pasta/repositorio como projeto estatico.

Depois de publicar, atualize:

- `CAMPAIGN.canonicalUrl` em `src/config/site-config.js`
- `<link rel="canonical">` em `index.html`
- dominio definitivo usado nas campanhas.

## Fontes oficiais usadas

- `Book Pinheiros Completo Interativo - RA79 - MAC Pinheiros - Marketing - 2023-09-22 (1) (1).pdf`
- `TV MAC PINHEIROS 08.26.pdf`
- Imagens oficiais em `Imagens-20260827T005418Z-1-001/Imagens`

Nao invente preco, disponibilidade, condicao comercial ou caracteristica ausente nos materiais oficiais.
 