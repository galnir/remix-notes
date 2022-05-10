import { db } from "~/utils/db.server";
import type { Note } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUserId } from "~/utils/session.server";
import NoteDisplay from "~/components/NoteDisplay";

type LoaderData = { firstNote: Note | null };

export const loader: LoaderFunction = async ({ request }) => {
  let userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  userId = userId as string;
  const firstNote = await db.note.findFirst({
    where: {
      userId,
    },
  });

  const data: LoaderData = { firstNote };
  return json(data);
};

export default function NotesIndexRoute() {
  const data = useLoaderData<LoaderData>();
  const note = data.firstNote;

  return note ? (
    <div>
      <NoteDisplay note={note} />
      <Link to={note.id + ""}>"{note.title}" Permalink</Link>
    </div>
  ) : (
    <h1>No notes</h1>
  );
}
