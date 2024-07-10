import type { ReactNode } from "react";
import { cx } from "~/cva.config";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    const cardClassName = cx(
        `border border-zinc-300 dark:border-zinc-700 rounded-lg p-4`,
        className
    );

    return <div className={cardClassName}>{children}</div>;
}
