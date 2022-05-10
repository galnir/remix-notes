import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const nir = await db.user.create({
    data: {
      username: "nir",
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
    getNotes().map((note) => {
      const data = { userId: nir.id, ...note };
      return db.note.create({ data });
    })
  );
}

seed();

function getNotes() {
  return [
    {
      title: "Homework",
      description: "Do my math homework",
    },
    { title: "Cleaning", description: "Clean my room" },
  ];
}
