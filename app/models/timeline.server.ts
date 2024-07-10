import type { Timeline, TimelineEvent } from "@prisma/client";
import { prisma } from "~/db.server";

export function createTimeline(newTimeline: Timeline) {
    return prisma.timeline.create({
        data: newTimeline,
    });
}

export function getTimelinesByUserId(createdById: string) {
    return prisma.timeline.findMany({
        where: {
            createdById,
        },
        select: {
            id: true,
            name: true,
            description: true,
            slug: true,
            events: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    createdBy: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });
}

export function addEventToTimeline(
    timelineId: Timeline["id"],
    eventId: TimelineEvent["id"]
) {
    return prisma.timeline.update({
        where: {
            id: timelineId,
        },
        data: {
            eventIds: {
                push: eventId,
            },
        },
    });
}

export function getTimelineBySlug(slug: string) {
    return prisma.timeline.findFirst({
        where: { slug },
        include: { events: true, createdBy: true },
    });
}
