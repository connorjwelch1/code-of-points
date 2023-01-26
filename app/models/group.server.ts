import type { ElementGroup } from "@prisma/client";
import { prisma } from "~/db.server";

export const getGroup = (id: ElementGroup["id"]) => {
    return prisma.elementGroup.findFirstOrThrow({
        where: { id },
        select: {
            skills: true,
            description: true,
            eventId: true,
            groupNumber: true,
            event: true,
        },
    });
};
