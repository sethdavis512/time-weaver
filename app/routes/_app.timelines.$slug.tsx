import { Button, Tag } from "@lemonsqueezy/wedges";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { format } from "date-fns/format";
import { isBefore } from "date-fns/isBefore";
import { useReducer } from "react";
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
    const [showPast, setShowPast] = useReducer((s) => !s, false);

    if (!timeline) {
        return null;
    }

    const pastEvents = timeline.events.filter((ev) => !isBefore(now, ev.start));

    return (
        <div className="container mx-auto space-y-4">
            <h1 className="mb-4 text-4xl font-bold">{timeline.name}</h1>
            <ul className="flex gap-2">
                <li>
                    Starts:{" "}
                    <Tag color="green">
                        {format(timeline.start, "M/d/yy p")}
                    </Tag>
                </li>
                <li>
                    Ends:{" "}
                    <Tag color="red">{format(timeline.end, "M/d/yy p")}</Tag>
                </li>
            </ul>
            <Card className="border-none dark:bg-gray-800">
                <span className="text-sm">Current time:</span>
                <h3 className="text-3xl font-bold">
                    {now.toLocaleTimeString()}
                </h3>
            </Card>
            <Button className="w-full" onClick={setShowPast} variant="outline">
                Click to {showPast ? "hide" : "show"} past events (
                {pastEvents.length})
            </Button>
            {timeline.events && timeline.events.length > 0 ? (
                timeline.events.map((ev) => {
                    const isInFuture = isBefore(now, ev.start);

                    if (!isInFuture && !showPast) {
                        return null;
                    }

                    return (
                        <PriorityCard
                            key={ev.id}
                            priority={getPriority(now, ev.start)}
                        >
                            <ul className="flex items-center justify-between">
                                <li>
                                    <h3 className="mb-2 text-xl font-bold">
                                        {ev.name}
                                    </h3>
                                    ⏰ Time left:{" "}
                                    {isInFuture ? (
                                        <Tag color="yellow" stroke>
                                            {getFormattedDuration(
                                                now,
                                                ev.start
                                            )}
                                        </Tag>
                                    ) : (
                                        <span className="italic">Expired</span>
                                    )}
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
                    );
                })
            ) : (
                <p>No events</p>
            )}
        </div>
    );
}
