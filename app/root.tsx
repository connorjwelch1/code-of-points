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
import { getAllEvents } from "./models/event.server";
import NavBar from "./components/NavBar";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Code of Points",
    viewport: "width=device-width,initial-scale=1",
});

export async function loader() {
    return json({
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
                    <NavBar events={events} />
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
