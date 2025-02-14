import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updatedGuarantee = await prisma.guarantee.update({
    where: { guarantee_id: 2 },
    data: {
      bankName: 'Tien Phong Bank',
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
