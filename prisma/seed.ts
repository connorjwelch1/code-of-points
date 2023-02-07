import { PrismaClient } from "@prisma/client";
import { events } from "./events";
import skills from "./output.json";

const prisma = new PrismaClient();

async function seed() {
    await prisma.event.deleteMany({}).catch(() => {});
    await prisma.elementGroup.deleteMany({}).catch(() => {});
    await prisma.skill.deleteMany({}).catch(() => {});

    await Promise.all(
        events.map((event) =>
            prisma.event.create({
                data: {
                    key: event.key,
                    fullName: event.fullName,
                },
            })
        )
    );

    await Promise.all(
        events.map((event) =>
            Promise.all(
                event.groups.map((group, index) =>
                    prisma.elementGroup.create({
                        data: {
                            groupNumber: index + 1,
                            description: group,
                            eventKey: event.key,
                        },
                    })
                )
            )
        )
    );

    // // const event = await prisma.event.findFirstOrThrow({
    // //     where: {
    // //         key: skills[0].eventKey,
    // //     },
    // // });

    // // console.log("found", event);

    // await prisma.skill.create({
    //     data: skills[0],
    // });

    await Promise.all(
        skills.map((skill) =>
            prisma.skill.create({
                data: skill,
            })
        )
    );

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
