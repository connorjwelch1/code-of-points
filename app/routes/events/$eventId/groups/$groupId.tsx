import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getGroup } from "~/models/group.server";

export const loader = async ({ params }: LoaderArgs) => {
    const { groupId } = params;
    invariant(typeof groupId === "string", "groupId must be a string");
    const group = await getGroup(groupId);
    return json({
        group,
    });
};

const Group = () => {
    const { group } = useLoaderData<typeof loader>();
    return (
        <div>
            <h1 className="font-bold text-xl">{group.description}</h1>
            <ul>
                {group.skills.map((skill) => (
                    <li key={skill.id}>
                        <Link to={`/skills/${skill.id}`} className="font-bold">
                            <div>
                                {skill.name}: {skill.value}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Group;
