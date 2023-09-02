declare namespace NodeJS {
  export interface ProcessEnv {
    OPENAI_API_KEY: string;

    KV_URL: string;
    KV_REST_API_URL: string;
    KV_REST_API_TOKEN: string;
    KV_REST_API_READ_ONLY_TOKEN: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_GITHUB_ID: string;
    NEXTAUTH_GITHUB_SECRET: string;
    NEXTAUTH_GOOGLE_ID: string;
    NEXTAUTH_GOOGLE_SECRET: string;
  }
}
