import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { getCommand } from '@/app/actions';
import { Playground } from '@/components/playground/Playground';
import { AUTH_PAGE } from '@/constants/auth';
import { auth } from '@/lib/auth';

export interface PlaygroundByIdPagePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PlaygroundByIdPagePageProps): Promise<Metadata> {
  const session = await auth();

  if (!session?.user) {
    return {};
  }

  const command = await getCommand(params.id, session.user.id);
  return {
    title: command?.title.toString().slice(0, 50) ?? 'Command',
  };
}

export default async function PlaygroundByIdPage({
  params,
}: PlaygroundByIdPagePageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect(`/${AUTH_PAGE}?callbackUrl=/playground/${params.id}`);
  }

  const command = await getCommand(params.id, session.user.id);

  if (!command) {
    notFound();
  }

  if (command?.userId !== session?.user?.id) {
    notFound();
  }

  return <Playground id={command.id} initialMessages={command.messages} />;
}
