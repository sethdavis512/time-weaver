import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { requireUserId } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);

    return null;
}

export default function IndexRoute() {
    return (
        <>
            <h1 className="mb-4 text-4xl font-bold">Welcome</h1>
            <p className="mb-4">More content coming soon...</p>
            <div className="flex">
                <Link to="timelines" className="underline dark:text-green-500">
                    View Timelines
                </Link>
            </div>
        </>
    );
}
