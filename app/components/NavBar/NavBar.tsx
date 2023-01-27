import type { Event } from "@prisma/client";
import { NavLink } from "@remix-run/react";

interface NavBarProps {
    events: Event[];
}
const NavBar = ({ events }: NavBarProps) => {
    return (
        <div className="w-56 bg-slate-600 text-white px-4">
            <div className="font-bold">Events</div>
            <ul className="ml-2">
                {events.map((event) => (
                    <div key={event.key}>
                        <NavLink
                            to={`/events/${event.key}`}
                            className={({ isActive }) =>
                                isActive ? "text-blue-200 font-bold" : undefined
                            }
                        >
                            {event.fullName}
                        </NavLink>
                    </div>
                ))}
            </ul>
        </div>
    );
};
export default NavBar;
