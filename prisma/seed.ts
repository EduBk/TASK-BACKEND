import { PrismaClient } from "@prisma/client";
import { encrypt } from "../src/utils/bcrypt.handle";

const prisma = new PrismaClient();

async function run() {
  const passHash = await encrypt("123456789");
  const eddy = await prisma.users.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@admin.com",
      password: passHash,
      phoneNumber: "333-480-6146",
      address: {
        street: "Rio Cihuatlan #619",
        city: "Zapopan",
        state: "Jalisco",
        zip: "45085",
      },
    },
  });
}

run()
  .catch((e) => {
    console.log(e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });