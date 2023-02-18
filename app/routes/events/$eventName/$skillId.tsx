import type { LoaderArgs } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getSkill } from "~/models/skill.server";

export const loader = async ({ params }: LoaderArgs) => {
    const { skillId } = params;
    invariant(typeof skillId === "string", "skillId must be a string");
    const skill = await getSkill(skillId);
    if (!skill) {
        throw new Response("Not found", { status: 404 });
    }
    return json({
        skill,
    });
};

export const CatchBoundary = () => {
    return (
        <div className="prose">
            <p>Skill not found</p>
        </div>
    );
};

const Skill = () => {
    const { skill } = useLoaderData<typeof loader>();

    return (
        <div className="flex justify-center content-center">
            <img src={`/skills/${skill.imagePath}`} alt={skill.name} />
        </div>
    );
};

export default Skill;
