import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getEvent } from "~/models/event.server";

export const loader = async ({ params }: LoaderArgs) => {
    const { eventId } = params;
    invariant(typeof eventId === "string", "eventId must be a string");
    const event = await getEvent(eventId);
    return json({
        event,
    });
};

const Event = () => {
    const { event } = useLoaderData<typeof loader>();
    return (
        <div className="text-center">
            <h1 className="font-bold text-xl">{event.name}</h1>
            <div className="font-semibold text-md">Element Groups</div>
            <ul>
                {event.elementGroups.map((elementGroup) => (
                    <li key={elementGroup.id}>
                        <Link
                            to={`groups/${elementGroup.id}`}
                            className="font-bold"
                        >
                            <div>
                                Group {elementGroup.groupNumber}:{" "}
                                {elementGroup.description}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    );
};

export default Event;
