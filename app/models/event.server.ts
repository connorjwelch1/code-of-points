import type { Event } from "@prisma/client";
import { prisma } from "~/db.server";

export const getAllEvents = () => {
    return prisma.event.findMany();
};

export const getEvent = (id: Event["id"]) => {
    return prisma.event.findFirstOrThrow({
        where: { id },
        select: { elementGroups: true, name: true, id: true },
    });
};
