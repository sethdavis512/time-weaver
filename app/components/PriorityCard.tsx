import { type ReactNode } from "react";
import { cva } from "~/cva.config";
import { Priority } from "~/utils/time";
import { Card } from "./Card";

interface PriorityCardProps {
    children: ReactNode;
    priority: Priority;
}

const cardVariants = cva({
    base: "border",
    variants: {
        priority: {
            [Priority.URGENT]:
                "border-4 dark:bg-red-800/70 dark:border-red-500",
            [Priority.HIGH_PRIORITY]:
                "border-4 dark:bg-orange-800/25 dark:border-orange-500/50",
            [Priority.MEDIUM_PRIORITY]: "dark:border-yellow-500/50",
            [Priority.LOW_PRIORITY]: "dark:border-green-500/50",
            [Priority.TRIVIAL]: "dark:border-green-900/50",
            [Priority.EXPIRED]: "dark:border-black",
        },
    },
    defaultVariants: {
        priority: Priority.TRIVIAL,
    },
});

export function PriorityCard({ children, priority }: PriorityCardProps) {
    return <Card className={cardVariants({ priority })}>{children}</Card>;
}
