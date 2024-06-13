import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updatedApplication = await prisma.application.update({
    where: { application_id: 1 },
    data: {
      bankName: 'Techcombank',
    },
  });

  console.log({ updatedApplication });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
