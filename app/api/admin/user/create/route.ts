import { NextResponse } from 'next/server';

import { hash } from 'bcryptjs';

import { ROLE_ADMIN } from '@/constants/auth';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  const userRole = session?.user?.role;

  if (!userId) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  if (!userRole || userRole !== ROLE_ADMIN) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  try {
    const { name, email, password, role } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
      role: string;
    };
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        role,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
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
