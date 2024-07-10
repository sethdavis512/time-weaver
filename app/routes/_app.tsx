import { LoaderFunctionArgs } from "@remix-run/node";
import { json, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import Logo from "~/components/Logo";
import { getUserId } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    return json({ userId: await getUserId(request) });
}

export default function AppRoute() {
    const { userId } = useLoaderData<typeof loader>();

    const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
        isActive ? "font-bold italic text-sky-400" : "";

    return (
        <>
            <header className="mb-4 flex items-center justify-between border-b border-zinc-700 p-4">
                <ul className="flex gap-4">
                    <li>
                        <NavLink className="flex items-center gap-2" to="/">
                            <div className="h-8 w-8">
                                <Logo fill="dark" />
                            </div>
                            TimeWeaver
                        </NavLink>
                    </li>
                    {/* {userId && (
                        <li>
                            <NavLink to="/" className={navLinkClassName}>
                                <HouseIcon />
                            </NavLink>
                        </li>
                    )} */}
                </ul>
                <ul className="flex gap-4">
                    {/* {!userId && (
                        <li>
                            <NavLink to="/sign-up" className={navLinkClassName}>
                                Sign up
                            </NavLink>
                        </li>
                    )} */}
                    {!userId && (
                        <li>
                            <NavLink to="/sign-in" className={navLinkClassName}>
                                Sign in
                            </NavLink>
                        </li>
                    )}
                    {userId && (
                        <li>
                            <NavLink
                                to="/sign-out"
                                className={navLinkClassName}
                            >
                                Sign out
                            </NavLink>
                        </li>
                    )}
                </ul>
            </header>
            <Outlet />
        </>
    );
}
