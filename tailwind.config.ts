import type { Config } from "tailwindcss";
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
    plugins: [wedgesTW()],
} satisfies Config;
