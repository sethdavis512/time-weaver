import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { wedgesTW } from "@lemonsqueezy/wedges";

export default {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "node_modules/@lemonsqueezy/wedges/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [
        wedgesTW({
            themes: {
                dark: {
                    colors: {
                        primary: {
                            ...colors.green,
                            DEFAULT: colors.green["600"],
                        },
                    },
                },
                light: {
                    colors: {
                        primary: {
                            ...colors.green,
                            DEFAULT: colors.green["500"],
                        },
                    },
                },
            },
        }),
    ],
} satisfies Config;
