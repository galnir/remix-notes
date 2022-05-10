import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import styled from "styled-components";
import { db } from "~/utils/db.server";

function validateNoteDescription(description: string) {
  if (description.length < 5) {
    return `Note content is too short`;
  }
}

function validateNoteTitle(title: string) {
  if (title.length < 2) {
    return `Title is too short`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: { title: string | undefined; description: string | undefined };
  fields?: {
    title: string;
    description: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  if (typeof title !== "string" || typeof description !== "string") {
    return badRequest({ formError: `Form not submitted correctly.` });
  }

  const fieldErrors = {
    title: validateNoteTitle(title),
    description: validateNoteDescription(description),
  };
  const fields = { title, description };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const note = await db.note.create({
    data: {
      ...fields,
      userId: "c1c779ef-ab75-461f-8024-d6357fc89cf6",
    },
  });
  return redirect(`/notes/${note.id}`);
};

export default function NewNote() {
  return (
    <div>
      <Form method="post">
        <FormItems>
          <FormItem>
            <label>
              Note Title
              <input type="text" name="title" placeholder="Note Title" />
            </label>
          </FormItem>
          <FormItem>
            <label>
              Note
              <textarea name="description" placeholder="Do something..." />
            </label>
          </FormItem>
          <FormItem>
            <button type="submit">Submit</button>
          </FormItem>
        </FormItems>
      </Form>
    </div>
  );
}

const FormItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
