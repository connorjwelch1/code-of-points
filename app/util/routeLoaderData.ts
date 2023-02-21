import { useRouteLoaderData } from "@remix-run/react";
import type { getEvent } from "~/models/event.server";

export type EventRouteLoaderData = {
    event: Awaited<ReturnType<typeof getEvent>>;
};

export const useEvent = () =>
    useRouteLoaderData("routes/events/$eventName") as EventRouteLoaderData;
