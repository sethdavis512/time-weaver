import { differenceInMinutes } from "date-fns/differenceInMinutes";
import { formatDuration } from "date-fns/formatDuration";
import { intervalToDuration } from "date-fns/intervalToDuration";
import { isBefore } from "date-fns/isBefore";

export function isLessThanGivenMinutesAway(
    earlierDate: Date | string | number,
    laterDate: Date | string | number,
    minutes = 5
) {
    return differenceInMinutes(laterDate, earlierDate) < minutes;
}

export const getFormattedDuration = (
    start: Date | string,
    end: Date | string
) => {
    return formatDuration(
        intervalToDuration({
            start,
            end,
        }),
        {
            format: ["days", "minutes", "seconds"],
            zero: true,
        }
    );
};

export enum Priority {
    URGENT = "urgent",
    HIGH_PRIORITY = "high",
    MEDIUM_PRIORITY = "medium",
    LOW_PRIORITY = "low",
    TRIVIAL = "trivial",
    EXPIRED = "expired",
}

export const getPriority = (
    earlierDate: Date,
    laterDate: Date | string
): Priority => {
    const isBeforeNow = isBefore(earlierDate, laterDate);

    if (!isBeforeNow) {
        return Priority.EXPIRED;
    }

    if (isLessThanGivenMinutesAway(earlierDate, laterDate, 5)) {
        return Priority.URGENT;
    } else if (isLessThanGivenMinutesAway(earlierDate, laterDate, 10)) {
        return Priority.HIGH_PRIORITY;
    } else if (isLessThanGivenMinutesAway(earlierDate, laterDate, 15)) {
        return Priority.MEDIUM_PRIORITY;
    } else if (isLessThanGivenMinutesAway(earlierDate, laterDate, 30)) {
        return Priority.LOW_PRIORITY;
    } else {
        return Priority.TRIVIAL;
    }
};
