import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getEvent } from "~/models/event.server";

export const loader = async ({ params }: LoaderArgs) => {
    const { eventName } = params;
    invariant(typeof eventName === "string", "eventName must be a string");
    const event = await getEvent(eventName);
    return json({
        event,
    });
};

const Event = () => {
    const { event } = useLoaderData<typeof loader>();
    return (
        <div className="text-center">
            <h1 className="font-bold text-xl">{event.fullName}</h1>
            <Outlet />
        </div>
    );
};

export default Event;
