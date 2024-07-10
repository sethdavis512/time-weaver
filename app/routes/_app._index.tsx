import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
        <div className="container mx-auto">
            <h1 className="mb-4 text-4xl font-bold">Timelines</h1>
            <div className="space-y-4">
                {timelines && timelines.length > 0 ? (
                    timelines.map((timeline) => (
                        <Link
                            className="block"
                            key={timeline.id}
                            to={`/timelines/${timeline.slug}`}
                        >
                            <Card>
                                {timeline.name}
                                {` // `}
                                {timeline.description}
                            </Card>
                        </Link>
                    ))
                ) : (
                    <Card>No timelines.</Card>
                )}
            </div>
        </div>
    );
}
