import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";
// import { addEventToTimeline } from "~/models/timeline.server";
import { addMinutes } from "date-fns/addMinutes";

// const pause = (duration: number) =>
//     new Promise((res) => setTimeout(res, duration));

// const testTimeline = await prisma.timeline.create({
//     data: {
//         name: `Timeline 3`,
//         description: "A very interesting one",
//         createdById: user.id,
//         slug: "timeline-3",
//         start: "2024-07-09T14:00:00.000Z",
//         end: "2024-07-09T15:00:00.000Z",
//     },
// });

// const testTimelineEvent = await prisma.timelineEvent.create({
//     data: {
//         name: "My event 3",
//         description: "A very interesting event",
//         createdById: user.id,
//         start: "2024-07-09T14:00:00.000Z",
//         end: "2024-07-09T15:00:00.000Z",
//     },
// });

// await addEventToTimeline(testTimeline.id, testTimelineEvent.id);

async function main() {
    const email = "seth@mail.com";
    const password = await bcrypt.hash("asdfasdf", 10);

    await prisma.timeline.deleteMany().catch(() => {});
    await prisma.timelineEvent.deleteMany().catch(() => {});

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    let userId = existingUser?.id as string;

    if (!existingUser) {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                profile: {
                    create: {
                        firstName: "Seth",
                        lastName: "Davis",
                    },
                },
            },
        });

        userId = user.id;
    }

    for (let i = 0; i < [...Array(3)].length; i++) {
        const start = addMinutes(new Date(), 1);

        await prisma.timeline.create({
            data: {
                name: `Timeline ${i + 1}`,
                description: "A very interesting one",
                createdById: userId,
                slug: `timeline-slug-${i + 1}`,
                start,
                end: addMinutes(start, 15),
                events: {
                    create: [...Array(15)].map((_, index) => {
                        const start = addMinutes(new Date(), (index + 1) * 2);

                        return {
                            name: `My event ${index}`,
                            description: "A very interesting event",
                            createdById: userId,
                            slug: `event-slug-${index}`,
                            start,
                            end: addMinutes(start, 15),
                        };
                    }),
                },
            },
        });
    }
}

main()
    .catch(async (e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
