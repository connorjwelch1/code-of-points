import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
    Form,
    useLoaderData,
    useParams,
    useRouteLoaderData,
    useSearchParams,
    useTransition,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { searchEventSkills } from "~/models/event.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    const { eventName } = params;
    invariant(typeof eventName === "string", "eventName must be a string");
    const url = new URL(request.url);
    const search = new URLSearchParams(url.search);
    const skills = await searchEventSkills(
        eventName,
        search.get("searchTerm"),
        search.get("minValue")
    );
    return json({
        skills,
    });
};

const Skills = () => {
    const { skills } = useLoaderData<typeof loader>();
    const { eventName } = useParams();
    const transition = useTransition();
    const [params] = useSearchParams();
    return (
        <div className="flex flex-col justify-center content-center flex-wrap">
            <Form className="flex flex-col gap-2">
                <input
                    key={eventName}
                    type="text"
                    name="searchTerm"
                    placeholder="Search skills..."
                    className="input input-bordered input-primary"
                    defaultValue={params.get("searchTerm")!}
                />
                <input
                    type="text"
                    name="minValue"
                    placeholder="Min Value"
                    className="input input-bordered input-primary"
                    defaultValue={params.get("minValue")!}
                />
                <button type="submit" className="btn btn-primary">
                    {transition.state === "submitting"
                        ? "Loading..."
                        : "Search Skills"}
                </button>
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
