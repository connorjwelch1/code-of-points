import { PrismaClient, Skill } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
    const email = "rachel@remix.run";

    // cleanup the existing database
    await prisma.user.delete({ where: { email } }).catch(() => {
        // no worries if it doesn't exist yet
    });

    const hashedPassword = await bcrypt.hash("racheliscool", 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: {
                create: {
                    hash: hashedPassword,
                },
            },
        },
    });

    await prisma.event
        .delete({ where: { name: "Floor Exercise" } })
        .catch(() => {});

    const event = await prisma.event.create({
        data: {
            name: "Floor Exercise",
        },
    });

    const elementGroup1 = await prisma.elementGroup.create({
        data: {
            groupNumber: 1,
            description: "Non-Acro",
            eventId: event.id,
        },
    });

    const skills = [
        {
            name: "Wide arm press handstand",
            description: "Press to wide arm handstand with 2s hold",
            value: "C",
        },
        {
            name: "Fedorchenco",
            description: "Russian with 1080 degrees or greater turn",
            value: "C",
        },
        {
            name: "Press handstand",
            description: "Press to handstand with 2s hold",
            value: "A",
        },
    ];

    skills.forEach(async (skill) => {
        await prisma.skill.create({
            data: {
                ...skill,
                elementGroupId: elementGroup1.id,
            },
        });
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
