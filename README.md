# De Heus Sales Agent Frontend

React + Vite starter for the De Heus Sales Agent POC. The visual language follows the supplied De Heus ONE source project (Plus Jakarta Sans / Inter, blue and green accents, light surfaces, rounded cards, subtle borders).

## Requirements
- Node.js 22.x or 24.x
- npm

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

The current chat response is **mock/demo data**. No ECV API or Cognito integration is configured yet.

## Planned integration points
- Cognito Hosted UI: OAuth 2.0 Authorization Code + PKCE.
- ECV Chat API: HTTPS request with Cognito access token.
- API base URL and Cognito public client settings should be provided through `VITE_` environment variables. Never put client secrets or API secrets in frontend environment variables.
- Confirm API request/response schema, conversation ID behavior, token claims, CORS origin, and error contract with ECV before integration.

## Hostinger deployment
Build with `npm run build`; upload the contents of `dist/` to the web root if using static hosting. Configure SPA fallback/rewrite to `index.html` for client-side routes if routing is added later.
