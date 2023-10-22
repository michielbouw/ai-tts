import { NextRequest, NextResponse } from 'next/server';

import { kv } from '@vercel/kv';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

import { auth } from '@/lib/auth';
import { nanoid } from '@/lib/utils';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  try {
    const json = await req.json();
    const { messages, previewToken } = json;

    if (previewToken) {
      configuration.apiKey = previewToken;
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      stream: true,
    });

    const stream = OpenAIStream(response, {
      async onCompletion(completion) {
        const title = json.messages[0].content.substring(0, 100);
        const id = json.id ?? nanoid();
        const createdAt = Date.now();
        const path = `/stream/${id}`;
        const payload = {
          id,
          title,
          userId,
          createdAt,
          path,
          messages: [
            ...messages,
            {
              content: completion,
              role: 'assistant',
            },
          ],
        };
        await kv.hmset(`command:${id}`, payload);
        await kv.zadd(`users:command:${userId}`, {
          score: createdAt,
          member: `command:${id}`,
        });
      },
    });

    return new StreamingTextResponse(stream);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 },
    );
  }
}
