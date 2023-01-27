import type { Event } from "@prisma/client";
import { prisma } from "~/db.server";

export const getAllEvents = () => {
    return prisma.event.findMany();
};

export const getEvent = (key: Event["key"]) => {
    return prisma.event.findFirstOrThrow({
        where: { key },
        select: { elementGroups: true, fullName: true, key: true },
    });
};

export const getEventSkills = (key: Event["key"]) => {
    return prisma.event.findFirstOrThrow({
        where: { key },
        select: { skills: true },
    });
};
