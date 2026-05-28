# HR Career Hub

A clean, mobile-friendly React + Vite website for students, freshers, and job seekers.

## Setup

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Features

- Free Resume Checker (keyword-based score, missing keywords, strong skills, tips)
- Interview Question Generator by role
- AI Prompt Toolkit preview
- HR PDF download placeholders
- SEO blog preview cards
- Email collection using localStorage with validation
- Premium ₹99 toolkit section with CTA link and resume templates

## Deployment

This project is ready to deploy on Vercel as a static Vite app.

## Troubleshooting: why testing/build may fail repeatedly in this environment

If `npm install` keeps failing with `403 Forbidden` for `https://registry.npmjs.org/@vitejs/plugin-react`, the failure is usually **environment policy/network access**, not app code.

Typical symptom chain:
1. `npm install` fails with `E403` from npm registry.
2. `npm run dev` / `npm run build` then fail because `vite` was never installed.

Useful checks:

```bash
npm config list
```

In this workspace, npm also reports a proxy-related warning:

- `Unknown env config "http-proxy"`
- active proxy env values are injected externally (`http://proxy:8080`)

That means tests can fail regularly here until registry/proxy permissions are fixed.
