'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { kv } from '@vercel/kv';

import { auth } from '@/lib/auth';
import type { Command } from '@/types/command';

export async function getCommands(userId?: string | null) {
  if (!userId) {
    return [];
  }

  try {
    const pipeline = kv.pipeline();
    const commands: string[] = await kv.zrange(
      `users:command:${userId}`,
      0,
      -1,
      {
        rev: true,
      },
    );

    for (const command of commands) {
      pipeline.hgetall(command);
    }

    const results = await pipeline.exec();

    return results as Command[];
  } catch (error) {
    return [];
  }
}

export async function getCommand(id: string, userId: string) {
  const command = await kv.hgetall<Command>(`command:${id}`);

  if (!command || (userId && command.userId !== userId)) {
    return null;
  }

  return command;
}

export async function removeCommand({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = await kv.hget<string>(`command:${id}`, 'userId');

  if (uid !== session?.user?.id) {
    return {
      error: 'Unauthorized',
    };
  }

  await kv.del(`command:${id}`);
  await kv.zrem(`users:command:${session.user.id}`, `command:${id}`);

  revalidatePath('/');
  return revalidatePath(path);
}

export async function clearCommands() {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Unauthorized',
    };
  }

  const commands: string[] = await kv.zrange(
    `users:command:${session.user.id}`,
    0,
    -1,
  );
  if (!commands.length) {
    return redirect('/');
  }
  const pipeline = kv.pipeline();

  for (const command of commands) {
    pipeline.del(command);
    pipeline.zrem(`users:command:${session.user.id}`, command);
  }

  await pipeline.exec();

  revalidatePath('/');
  return redirect('/');
}
