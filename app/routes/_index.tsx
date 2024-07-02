import { Alert } from "@lemonsqueezy/wedges";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Timeline Keeper" },
        { name: "description", content: "Timeline Keeper" },
    ];
};

export default function Index() {
    return (
        <>
            <h1>⏰ Timeline Keeper ⏰</h1>
            <Alert variant="expanded" color="primary">
                {`You're awesome!`}
            </Alert>
        </>
    );
}
