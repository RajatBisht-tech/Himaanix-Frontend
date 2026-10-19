# Himaanix Fashion Storefront

A responsive React + Vite fashion e-commerce starter inspired by modern multi-category fashion marketplaces. This uses Himaanix branding and original layout/content rather than copying Nykaa Fashion assets or branding.

## Run
```bash
npm install
npm run dev
```

## Backend
Copy `.env.example` to `.env` and set:
`VITE_API_URL=http://localhost:5000/api`

Product listing tries the `/products` API and falls back to demo products. Cart/wishlist are stored locally for the starter. Checkout remains a placeholder until secure backend checkout and payment verification are implemented.
