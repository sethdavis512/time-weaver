import { Dispatch, useEffect, useState } from "react";

export const useCurrentTime = (): [Date, Dispatch<Date>] => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line
    }, []);

    return [now, setNow];
};
