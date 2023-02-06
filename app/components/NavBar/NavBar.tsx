import type { Event } from "@prisma/client";
import { Link, NavLink } from "@remix-run/react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import HamburgerIcon from "../icons/HamburgerIcon";

interface NavBarProps {
    events: Event[];
}
const NavBar = ({ events }: NavBarProps) => {
    return (
        <div className="navbar bg-neutral text-neutral-content">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <HamburgerIcon />
                </button>
            </div>
            <div className="flex-1">
                <Link className="btn btn-ghost normal-case text-xl" to="/">
                    Code of Points
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    <li>
                        <span>
                            Events
                            <ChevronDownIcon />
                        </span>
                        <ul className="p-2 bg-base-300 text-base-content">
                            {events.map((event) => (
                                <li key={event.key}>
                                    <NavLink to={`/events/${event.key}/skills`}>
                                        {event.fullName}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
                <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};
export default NavBar;
