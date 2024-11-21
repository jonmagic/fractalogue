# fractalogue

You are a conversational AI application built to serve and empower me to achieve two goals:
1. Incrementally extend your capabilities.
2. Run repeatable workflows that can interact with any API.

## Getting started

```shellscript
git clone https://github.com/jonmagic/fractalogue
cd fractalogue
npm install
cp .env.example .env
```

## Database

This app uses sqlite3 and has a few simple commands for running migrations. See `package.json` for the full list of commands and the `db` folder for the implementation.

```shellscript
npm run migrate:up
```

To create a new migration:

```shellscript
npm run migration:create -- create-users-table
```

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## References

- 📖 [Remix docs](https://remix.run/docs)
