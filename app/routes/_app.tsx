import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import { getUserId } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    return json({ userId: await getUserId(request) });
}

export default function AppRoute() {
    const { userId } = useLoaderData<typeof loader>();

    return (
        <>
            <Header isLoggedIn={!!userId} />
            <div className="px-4">
                <Outlet />
            </div>
        </>
    );
}
