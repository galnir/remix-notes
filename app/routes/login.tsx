import styled from "styled-components";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { createUserSession, getUserId, register } from "~/utils/session.server";
import { WEIGHTS } from "~/constants";

export const meta: MetaFunction = () => {
  return {
    title: "Notes | Login",
    description: "Login to create your own notes",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/notes");
  return null;
};

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

function validateUrl(url: any) {
  let urls = ["/notes", "/", "https://remix.run"];
  if (urls.includes(url)) {
    return url;
  }
  return "/notes";
}

type ActionData = {
  formError?: string;
  fieldErrors?: { username: string | undefined; password: string | undefined };
  fields?: { loginType: string; username: string; password: string };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");
  const redirectTo = validateUrl(form.get("redirectTo") || "/notes");
  if (
    typeof loginType !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({ formError: `Form not submitted correctly.` });
  }

  const fields = { loginType, username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  switch (loginType) {
    case "login": {
      const user = await db.user.findFirst({ where: { username } });
      if (!user) {
        return badRequest({
          fields,
          formError: `Username/Password combination is incorrect`,
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    case "register": {
      const userExists = await db.user.findFirst({ where: { username } });
      if (userExists) {
        return badRequest({
          fields,
          formError: `User with username ${username} already exists`,
        });
      }

      const user = await register({ username, password });
      if (!user) {
        return badRequest({
          fields,
          formError: `Something went wrong trying to create a new user.`,
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    default: {
      return badRequest({ fields, formError: "Login type invalid" });
    }
  }
};

const buttonStyle = {
  textDecoration: "none",
  color: "black",
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Login or Register</FormTitle>
        <Form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />
          <FormRadioField>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
              />{" "}
              Login
            </label>
            <label>
              <input
                type="radio"
                name="loginType"
                value="register"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "regisster"
                }
              />{" "}
              Register
            </label>
          </FormRadioField>
          <FormField>
            <label htmlFor="username-input">Username</label>
            <FormFieldInput
              type="text"
              id="username-input"
              name="username"
              defaultValue={actionData?.fields?.username}
              aria-invalid={Boolean(actionData?.fieldErrors?.username)}
              aria-errormessage={
                actionData?.fieldErrors?.username ? "username-error" : undefined
              }
            />
            {actionData?.fieldErrors?.username ? (
              <p role="alert" id="username-error">
                {actionData.fieldErrors.username}
              </p>
            ) : (
              <>&nbsp;</>
            )}
          </FormField>
          <FormField>
            <label htmlFor="password-input">Password</label>
            <FormFieldInput
              id="password-input"
              name="password"
              defaultValue={actionData?.fields?.password}
              type="password"
              aria-invalid={Boolean(actionData?.fieldErrors?.password)}
              aria-errormessage={
                actionData?.fieldErrors?.password ? "password-error" : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <p role="alert" id="password-error">
                {actionData.fieldErrors.password}
              </p>
            ) : (
              <>&nbsp;</>
            )}
          </FormField>
          <div id="form-error-message">
            {actionData?.formError ? (
              <p className="form-validation-error" role="alert">
                {actionData.formError}
              </p>
            ) : (
              <>&nbsp;</>
            )}
          </div>
          <FormButtonWrapper>
            <FormButton type="submit">Submit</FormButton>
          </FormButtonWrapper>
        </Form>
        <LinksNav>
          <NavLink>
            <Link style={buttonStyle} to="/">
              Home
            </Link>
          </NavLink>
          <NavLink>
            <Link style={buttonStyle} to="/notes">
              Notes
            </Link>
          </NavLink>
        </LinksNav>
      </FormWrapper>
    </Container>
  );
}

const Container = styled.div`
  min-width: 100vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
`;

const FormWrapper = styled.div`
  width: 400px;
  height: fit-content;
  padding: 6px;
  display: flex;
  flex-direction: column;
  background-color: var(--lighter-orange);
  box-shadow: 0px 8px 16px hsl(0deg 0% 0% / 0.25);
  border-radius: 12px;
  gap: 0.5rem;
`;

const FormTitle = styled.h1`
  text-align: center;
  font-weight: ${WEIGHTS.bold};
`;

const FormRadioField = styled.fieldset`
  display: flex;
  justify-content: space-around;
  border: 1px solid var(--orange);
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

const FormFieldInput = styled.input`
  border: 2px solid var(--orange);
  border-radius: 4px;
  background-color: var(--lighter-gray);
`;

const FormButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormButton = styled.button`
  color: black;
  font-weight: ${WEIGHTS.bold};
  width: 100%;
  margin: 1rem;
  background-color: var(--lighter-gray);
  border: 0;
  border-radius: 4px;
  box-shadow: 2px 2px 6px hsl(0deg 0% 0% / 0.25);
`;

const LinksNav = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0 1rem;
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled.li`
  display: block;
  background-color: var(--light-orange);
  padding: 0.25rem;
  border-radius: 4px;
  box-shadow: 2px 4px 6px hsl(0deg 0% 0% / 0.25);

  &:hover {
    background-color: var(--lighter-orange);
  }
`;
