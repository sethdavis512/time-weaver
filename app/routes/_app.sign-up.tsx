import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button, Input } from "@lemonsqueezy/wedges";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { getUser, register } from "~/utils/auth.server";
import { signUpSchema } from "~/utils/schemas";

export async function loader({ request }: LoaderFunctionArgs) {
    return (await getUser(request)) ? redirect("/") : null;
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: signUpSchema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    return await register(submission.value);
}

export default function SignUpRoute() {
    const [form, fields] = useForm({
        constraint: getZodConstraint(signUpSchema),
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="mx-auto max-w-lg pt-8">
            <Form method="post" {...getFormProps(form)} className="space-y-4">
                <h1 className="mb-8 text-4xl font-bold">Sign up</h1>
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
                <Input
                    label="First name"
                    helperText={
                        fields.firstName.errors ??
                        "Must be between at least 2 characters"
                    }
                    {...getInputProps(fields.firstName, { type: "text" })}
                />
                <Input
                    label="Last name"
                    helperText={
                        fields.lastName.errors ??
                        "Must be between at least 2 characters"
                    }
                    {...getInputProps(fields.lastName, { type: "text" })}
                />
                <Button type="submit">Register</Button>
                <p>
                    {`Have an account?`}{" "}
                    <Link
                        to="/sign-in"
                        className="underline dark:text-green-500"
                    >
                        Sign in here
                    </Link>
                </p>
            </Form>
        </div>
    );
}
