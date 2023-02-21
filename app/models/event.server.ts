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

export const searchEventSkills = (
    eventKey: Event["key"],
    searchTerm: string | null,
    minValue: string | null,
    elementGroupNumber: number | null
) => {
    return prisma.skill.findMany({
        where: {
            eventKey,
            description: {
                contains: searchTerm || undefined,
            },
            value: {
                gte: minValue || undefined,
            },
            elementGroup: {
                groupNumber: elementGroupNumber || undefined,
            },
        },
    });
};
