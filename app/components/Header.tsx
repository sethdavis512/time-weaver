import { useState } from "react";
import { Link, NavLink } from "@remix-run/react";
import Logo from "./Logo";
import { Button } from "@lemonsqueezy/wedges";
import { cx } from "~/cva.config";

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [show, setShow] = useState(false);

    return (
        <nav className="border-zinc-200 bg-white dark:bg-zinc-900">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                <Link
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <div className="h-8 w-8">
                        <Logo fill="dark" />
                    </div>
                    TimeWeaver
                </Link>
                <Button
                    aria-controls="navbar-default"
                    aria-expanded="false"
                    className="md:hidden"
                    onClick={() => setShow(true)}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </Button>
                <div
                    className={cx(
                        "w-full md:block md:w-auto",
                        !show && "hidden"
                    )}
                    id="navbar-default"
                >
                    <ul className="mt-4 flex flex-col rounded-lg bg-zinc-50 dark:bg-zinc-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-zinc-900 rtl:space-x-reverse">
                        {!isLoggedIn && (
                            <li>
                                <NavLink
                                    to="/sign-in"
                                    className="block p-4"
                                    onClick={() => setShow(false)}
                                >
                                    Sign in
                                </NavLink>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li>
                                <NavLink
                                    to="/sign-out"
                                    className="block p-4"
                                    onClick={() => setShow(false)}
                                >
                                    Sign out
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
