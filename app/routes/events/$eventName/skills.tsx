import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
    Form,
    useLoaderData,
    useParams,
    useSearchParams,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { getEventSkills, searchEventSkills } from "~/models/event.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    const { eventName } = params;
    invariant(typeof eventName === "string", "eventName must be a string");
    const url = new URL(request.url);
    const search = new URLSearchParams(url.search);
    const skills = await searchEventSkills(eventName, search.get("searchTerm"));
    return json({
        skills,
    });
};

const Skills = () => {
    const { skills } = useLoaderData<typeof loader>();
    const [params] = useSearchParams();
    return (
        <div className="flex flex-col justify-center content-center flex-wrap">
            <Form>
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search skills..."
                    defaultValue={params.get("searchTerm")!}
                />
            </Form>
            {skills.map((skill) => (
                <div key={skill.id}>
                    <div className="font-semibold text-md">
                        {skill.value.toUpperCase()}
                    </div>
                    <img src={`/skills/${skill.imagePath}`} alt={skill.name} />
                </div>
            ))}
        </div>
    );
};

export default Skills;
