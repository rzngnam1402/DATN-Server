import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const pass1 = await argon.hash('banker1402333');
  const pass2 = await argon.hash('namle1402333');
  const pass3 = await argon.hash('admin');
  const pass4 = await argon.hash('banker1402333');

  const user1 = await prisma.user.create({
    data: {
      email: 'gianggnamm1402@gmail.com',
      username: 'Việt Com',
      hash: pass1,
      phone: '0966244758',
      address: 'Hanoi, Vietnam',
      company: 'Vietcombank',
      signature:
        'https://firebasestorage.googleapis.com/v0/b/datn-1cf0a.appspot.com/o/user_signature%2F1.png?alt=media&token=310a3d95-4ce1-4ca3-9341-716628db3aa8',
      role: 'BANKER',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'nam.lg205004@sis.hust.edu.vn',
      username: 'Giang Nam',
      hash: pass2,
      phone: '0966244758',
      address: 'Hanoi, Vietnam',
      company: 'Hanoi University of Science and Technology',
      role: 'CLIENT',
      position: 'Manager',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'admin@vieguarantee.com',
      username: 'Admin',
      hash: pass3,
      phone: '0966244758',
      address: 'Hanoi, Vietnam',
      company: 'Vieguarantee',
      role: 'ADMIN',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      email: 'officer@vietcombank.com',
      username: 'Officer',
      hash: pass4,
      phone: '0966244758',
      address: 'Hanoi, Vietnam',
      company: 'Vieguarantee',
      role: 'BANKER',
      position: 'Officer',
    },
  });

  // const updatedUser = await prisma.user.update({
  //   where: { email: 'officer@vietcombank.com' },
  //   data: {
  //     // company: 'Vietcombank',
  //     signature:
  //       'https://firebasestorage.googleapis.com/v0/b/datn-1cf0a.appspot.com/o/user_signature%2F1.png?alt=media&token=310a3d95-4ce1-4ca3-9341-716628db3aa8',
  //   },
  // });

  console.log({ user1, user2, user3, user4 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
