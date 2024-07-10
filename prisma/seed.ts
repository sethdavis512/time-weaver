import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";
// import { addEventToTimeline } from "~/models/timeline.server";
import { addMinutes } from "date-fns/addMinutes";
import kebabCase from "lodash/kebabCase";
import { addDays } from "date-fns/addDays";
import { addHours } from "date-fns/addHours";

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

const raceEvents = [
    "Secure race venue and track",
    "Obtain necessary permits and licenses",
    "Develop race schedule and itinerary",
    "Design and map out the race track",
    "Arrange for race safety inspections",
    "Hire and train race officials and marshals",
    "Set up timing and scoring systems",
    "Coordinate with local authorities for road closures",
    "Secure sponsorships and partnerships",
    "Develop marketing and promotional strategies",
    "Launch race website and social media pages",
    "Open race registration for participants",
    "Verify and approve participant applications",
    "Assign race numbers to participants",
    "Organize participant orientation and briefings",
    "Design and print race credentials and passes",
    "Arrange for medical personnel and emergency services",
    "Secure ambulance and medical facilities",
    "Set up race communication systems (radios, etc.)",
    "Arrange for pit lane and garage allocations",
    "Coordinate with suppliers for race equipment",
    "Order race fuel and tire supplies",
    "Prepare race cars for technical inspections",
    "Schedule pre-race testing and practice sessions",
    "Arrange for track maintenance and cleanup",
    "Set up grandstands and spectator areas",
    "Install barriers and safety fences",
    "Coordinate with food and beverage vendors",
    "Arrange for portable restrooms and sanitation services",
    "Set up race control center",
    "Organize security personnel and checkpoints",
    "Plan and execute pre-race ceremonies",
    "Coordinate with media for coverage",
    "Set up media center and press areas",
    "Arrange for live broadcasting equipment and crew",
    "Distribute media credentials and passes",
    "Coordinate with photographers and videographers",
    "Plan for inclement weather contingencies",
    "Arrange for transportation and parking logistics",
    "Set up signage and wayfinding around the venue",
    "Develop race day emergency procedures",
    "Brief participants on race rules and regulations",
    "Perform final track inspections and approvals",
    "Arrange for fuel and tire logistics in the pit area",
    "Coordinate with tow trucks and recovery vehicles",
    "Set up driver briefing rooms and areas",
    "Arrange for technical inspection stations",
    "Organize volunteer recruitment and training",
    "Set up registration and check-in desks",
    "Prepare participant goodie bags and materials",
    "Ensure availability of spare parts and tools",
    "Coordinate with hospitality providers for VIPs",
    "Arrange for entertainment and activities for spectators",
    "Set up first aid stations around the venue",
    "Secure insurance for the event and participants",
    "Set up electronic timing loops and sensors",
    "Install public address systems for announcements",
    "Plan and execute pre-race promotions and events",
    "Organize vehicle transport logistics",
    "Coordinate with local hotels for participant accommodations",
    "Plan for environmental sustainability and waste management",
    "Develop contingency plans for technical failures",
    "Conduct training sessions for officials and staff",
    "Schedule driver autograph sessions and meet-and-greets",
    "Arrange for race day ticket sales and distribution",
    "Ensure compliance with all legal and regulatory requirements",
    "Plan for race day crowd control and flow management",
    "Coordinate with local businesses for race day impact",
    "Prepare race programs and informational materials",
    "Develop and distribute a race day operations manual",
    "Set up driver and team hospitality areas",
    "Install trackside advertising and banners",
    "Coordinate with local emergency services for on-call support",
    "Plan and execute race day catering for staff and officials",
    "Arrange for technical support for electronic systems",
    "Organize driver briefings and safety meetings",
    "Set up and test starting lights and signals",
    "Arrange for pre-race vehicle scrutineering",
    "Coordinate with tire and fuel suppliers for delivery schedules",
    "Prepare pit lane and paddock areas",
    "Ensure compliance with health and safety regulations",
    "Plan for VIP and guest services",
    "Arrange for photo and video documentation of the event",
    "Coordinate with local transportation services for shuttle buses",
    "Organize pre-race vehicle inspection and weighing",
    "Prepare incident response plans and teams",
    "Set up race result displays and information boards",
    "Plan for post-race cleanup and teardown",
    "Conduct final participant briefings and updates",
    "Test all communication and electronic systems",
    "Coordinate with local tourism boards for promotional activities",
    "Organize race merchandise and souvenir sales",
    "Prepare post-race award ceremonies and trophies",
    "Plan for post-race participant and team feedback",
    "Ensure all equipment and infrastructure are in place",
    "Coordinate with local weather services for updates",
    "Set up fuel storage and handling facilities",
    "Prepare and distribute race day schedules to all stakeholders",
    "Conduct a final walkthrough and checklist review",
    "Perform a final safety briefing and readiness check",
];

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

    const raceNames = [
        "Grand Prix of Velocity Ridge",
        "Thunder Valley Endurance Challenge",
        "Apex Legends Speed Fest",
    ];

    for (let i = 0; i < raceNames.length; i++) {
        const start = addMinutes(new Date(), 1);

        await prisma.timeline.create({
            data: {
                name: raceNames[i],
                description: "A very cool race...",
                createdById: userId,
                slug: kebabCase(raceNames[i]),
                start,
                end: addDays(start, 1),
                events: {
                    create: raceEvents.slice(0, 20).map((raceEvent, index) => {
                        const start =
                            index > 5
                                ? addHours(
                                      addMinutes(new Date(), (index + 1) * 5),
                                      Math.floor(index / 5)
                                  )
                                : addMinutes(new Date(), (index + 1) * 5);

                        return {
                            name: raceEvent,
                            description:
                                "A description about the race event...",
                            createdById: userId,
                            slug: kebabCase(raceEvent),
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
