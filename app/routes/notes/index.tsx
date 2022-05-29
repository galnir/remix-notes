import { db } from "~/utils/db.server";
import type { Note } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUserId } from "~/utils/session.server";
import NoteDisplay from "~/components/NoteDisplay";
import styled from "styled-components";

type LoaderData = { notes: Note[] | null };

export const loader: LoaderFunction = async ({ request }) => {
  let userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  userId = userId as string;
  const notes = await db.note.findMany({
    where: {
      userId,
    },
  });

  const data: LoaderData = { notes };
  return json(data);
};

export default function NotesIndexRoute() {
  const data = useLoaderData<LoaderData>();
  const notes = data.notes;

  if (!notes) return <h1>No notes</h1>;
  const notesElements = notes.map((note) => {
    return (
      <NoteWrapper key={note.id}>
        <NoteDisplay note={note} />
        <Link rel="prefetch" to={note.id + ""}>
          "{note.title}" Permalink
        </Link>
      </NoteWrapper>
    );
  });
  return <Container>{notesElements}</Container>;
}

const Container = styled.div`
  height: calc(100vh - 16px);
`;

const NoteWrapper = styled.div`
  padding-top: 16px;
`;
