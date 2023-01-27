import { PrismaClient } from "@prisma/client";
import { events } from "./events";

const prisma = new PrismaClient();

async function seed() {
    await prisma.event.deleteMany({}).catch(() => {});

    events.forEach(async (event) => {
        await prisma.event.create({
            data: {
                key: event.key,
                fullName: event.fullName,
            },
        });
        await Promise.all(
            event.groups.map((group, index) =>
                prisma.elementGroup.create({
                    data: {
                        groupNumber: index + 1,
                        description: group,
                        eventKey: event.key,
                    },
                })
            )
        );
    });

    console.log(`Database has been seeded. 🌱`);
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
