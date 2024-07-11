import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getUserId, requireUserId } from "~/utils/auth.server";
import { getTimelinesByUserId } from "~/models/timeline.server";
import { Card } from "~/components/Card";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);

    const userId = await getUserId(request);
    invariant(userId, "User ID encountered an error");

    const timelines = await getTimelinesByUserId(userId);

    return json({
        timelines,
    });
}

export default function IndexRoute() {
    const { timelines } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="mb-4 text-4xl font-bold">Timelines</h1>
            <div className="flex gap-8">
                <div className="flex-initial">
                    <div className="space-y-4">
                        {timelines && timelines.length > 0 ? (
                            timelines.map((timeline) => (
                                <Link
                                    className="block underline dark:text-green-500"
                                    key={timeline.id}
                                    to={`/timelines/${timeline.slug}`}
                                >
                                    {timeline.name}
                                </Link>
                            ))
                        ) : (
                            <Card>No timelines.</Card>
                        )}
                    </div>
                </div>
                <div className="flex-initial">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
