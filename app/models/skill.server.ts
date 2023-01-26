import type { Skill } from "@prisma/client";
import { prisma } from "~/db.server";

export const getAllSkills = () => {
    return prisma.skill.findMany();
};

export const getSkill = (id: Skill["id"]) => {
    return prisma.skill.findFirst({
        where: { id },
    });
};
