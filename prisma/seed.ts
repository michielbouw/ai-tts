import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('michiel123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'admin@michielbouw.nl' },
    update: {},
    create: {
      email: 'admin@michielbouw.nl',
      name: 'Admin',
      password,
      role: 'admin',
    },
  });
  console.log({ user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
