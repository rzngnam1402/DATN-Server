import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updatedGuarantee = await prisma.guarantee.update({
    where: { guarantee_id: 5 },
    data: {
      status: 'UNCHECKED',
    },
  });

  console.log({ updatedGuarantee });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
