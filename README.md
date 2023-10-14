# ai-tts

AI language model tool & playground

## Technologies

- [Vercel](https://vercel.com/solutions/nextjs)
- [Next.js](https://nextjs.org) v13
- General styling with [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) styled ui components ([install on Next.js](https://ui.shadcn.com/docs/installation/next)) & [full examples](https://ui.shadcn.com/examples/dashboard)
- [Radix UI](https://radix-ui.com) for headless [component primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [NextAuth.js](https://github.com/nextauthjs/next-auth) ([v5/experimental](https://github.com/nextauthjs/next-auth/pull/7443), edge runtime ready) for authentication, based on [Auth.js](https://authjs.dev/)
- History with [Vercel KV](https://vercel.com/storage/kv)
- [Vercel AI SDK](https://sdk.vercel.ai/docs) with support for OpenAI (default), [Anthropic](https://anthropic.com), [Hugging Face](https://huggingface.co), or custom AI chat models and/or [LangChain](https://js.langchain.com)

## Creating a KV Database Instance

Follow the steps outlined in the [quick start guide](https://vercel.com/docs/storage/vercel-kv/quickstart#create-a-kv-database) provided by Vercel. This guide will assist you in creating and configuring your KV database instance on Vercel, enabling your application to interact with it.

Remember to update your environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`) in the `.env` file with the appropriate credentials provided during the KV database setup.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

Pre:

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`
4. Install deps `yarn` OR `npm install`

Run:

1. Run devserver `yarn dev` OR `npm run dev`
2. Your app should now be running on [localhost:3000](http://localhost:3000/).

## Deployment

You can deploy your own version to [Vercel](https://vercel.com/).
