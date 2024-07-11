import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button, Input } from "@lemonsqueezy/wedges";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { getUser, login } from "~/utils/auth.server";
import { signInSchema } from "~/utils/schemas";

export async function loader({ request }: LoaderFunctionArgs) {
    return (await getUser(request)) ? redirect("/") : null;
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: signInSchema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    return await login(submission.value);
}

export default function SignInRoute() {
    const [form, fields] = useForm({
        constraint: getZodConstraint(signInSchema),
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="mx-auto max-w-lg pt-8">
            <Form method="POST" {...getFormProps(form)} className="space-y-4">
                <h1 className="mb-8 text-4xl font-bold">Sign in</h1>
                <Input
                    label="Email"
                    helperText={fields.email.errors}
                    {...getInputProps(fields.email, { type: "email" })}
                />
                <Input
                    label="Password"
                    helperText={
                        fields.password.errors ??
                        "Must be between at least 8 characters"
                    }
                    {...getInputProps(fields.password, {
                        type: "password",
                    })}
                />
                <Button type="submit">Sign in</Button>
                <p>
                    {`Don't have an account? `}
                    <Link
                        to="/sign-up"
                        className="underline dark:text-green-500"
                    >
                        Sign up here
                    </Link>
                </p>
            </Form>
        </div>
    );
}
