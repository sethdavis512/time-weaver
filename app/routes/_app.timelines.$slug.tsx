import { Tag } from "@lemonsqueezy/wedges";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { format } from "date-fns/format";
import { isBefore } from "date-fns/isBefore";
import invariant from "tiny-invariant";

import { Card } from "~/components/Card";
import { PriorityCard } from "~/components/PriorityCard";
import { useCurrentTime } from "~/hooks/useCurrentTime";
import { getTimelineBySlug } from "~/models/timeline.server";
import { requireUserId } from "~/utils/auth.server";
import { getFormattedDuration, getPriority } from "~/utils/time";

export async function loader({ request, params }: LoaderFunctionArgs) {
    await requireUserId(request);

    const { slug } = params;
    invariant(slug, "Slug error");

    const timeline = await getTimelineBySlug(slug);

    return json({ timeline });
}

export default function TimelineDetailRoute() {
    const { timeline } = useLoaderData<typeof loader>();
    const [now] = useCurrentTime();

    if (!timeline) {
        return null;
    }

    return (
        <div className="container mx-auto space-y-4 px-4">
            <Card>
                <h1 className="mb-4 text-4xl font-bold">{timeline.name}</h1>
                <ul>
                    <li>
                        Starts: <Tag>{format(timeline.start, "M/d/yy p")}</Tag>
                    </li>
                    <li>
                        Ends: <Tag>{format(timeline.end, "M/d/yy p")}</Tag>
                    </li>
                </ul>
            </Card>
            <Card>
                <span className="text-sm">Current time:</span>
                <h3 className="text-3xl font-bold">
                    {now.toLocaleTimeString()}
                </h3>
            </Card>
            {timeline.events && timeline.events.length > 0 ? (
                timeline.events
                    .filter((ev) => isBefore(now, ev.start))
                    .map((ev) => (
                        <PriorityCard
                            key={ev.id}
                            priority={getPriority(now, ev.start)}
                        >
                            <ul className="flex items-center justify-between">
                                <li>
                                    <h3 className="text-2xl">{ev.name}</h3>
                                </li>
                                <li>
                                    Time left:{" "}
                                    {getFormattedDuration(now, ev.start)}
                                </li>
                                <li>
                                    <details>
                                        <summary className="font-bold">
                                            View details
                                        </summary>
                                        <ul className="space-y-2 p-2">
                                            <li>
                                                Start:{" "}
                                                {format(
                                                    ev.start,
                                                    "yyyy/MM/dd p"
                                                )}
                                            </li>
                                            <li>
                                                End:{" "}
                                                {format(ev.end, "yyyy/MM/dd p")}
                                            </li>
                                            <li>
                                                Event length:{" "}
                                                {getFormattedDuration(
                                                    ev.start,
                                                    ev.end
                                                )}
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </PriorityCard>
                    ))
            ) : (
                <p>No events</p>
            )}
        </div>
    );
}
