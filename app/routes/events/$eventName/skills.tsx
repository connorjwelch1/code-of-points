import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import Filters from "~/components/Filters";
import { searchEventSkills } from "~/models/event.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    const { eventName } = params;
    invariant(typeof eventName === "string", "eventName must be a string");
    const url = new URL(request.url);
    const search = new URLSearchParams(url.search);
    const elementGroup = search.get("elementGroup");
    const groupNumber = elementGroup ? parseInt(elementGroup) : null;

    const skills = await searchEventSkills(
        eventName,
        search.get("searchTerm"),
        search.get("minValue")?.toLowerCase() || null,
        groupNumber
    );
    return json({
        skills,
    });
};

const Skills = () => {
    const { skills } = useLoaderData<typeof loader>();
    const { eventName } = useParams();
    return (
        <div className="flex flex-col justify-center content-center flex-wrap gap-6">
            <Filters key={eventName} />
            <div className="flex flex-row flex-wrap justify-center content-center gap-6">
                {skills.map((skill) => (
                    <Link
                        key={skill.id}
                        to={`../${skill.id}`}
                        className="border-8 rounded-md hover:border-primary-content transition-colors"
                    >
                        <div className="font-semibold text-md">
                            {skill.value.toUpperCase()}
                        </div>
                        <img
                            src={`/skills/${skill.imagePath}`}
                            alt={skill.name}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Skills;
