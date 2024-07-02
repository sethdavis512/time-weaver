import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
    return json({});
}

export async function action({ request }: ActionFunctionArgs) {
    // const form = await request.formData();
    return null;
}

export default function LoginRoute() {
    return <div className=""></div>;
}
