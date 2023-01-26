import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    NavLink,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { getAllEvents } from "./models/event.server";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Remix Notes",
    viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
    return json({
        user: await getUser(request),
        events: await getAllEvents(),
    });
}

export default function App() {
    const { events } = useLoaderData<typeof loader>();
    return (
        <html lang="en" className="h-full">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="h-full">
                <div className="flex flex-row h-full">
                    <div className="w-56 bg-slate-600 text-white px-4">
                        <div className="font-bold">Events</div>
                        <ul className="ml-2">
                            {events.map((event) => (
                                <NavLink
                                    key={event.id}
                                    to={`/events/${event.id}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-200 font-bold"
                                            : undefined
                                    }
                                >
                                    {event.name}
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                    <main className="flex justify-center w-full">
                        <Outlet />
                    </main>
                </div>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
