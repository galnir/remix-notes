import type { Note } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NoteDisplay from "~/components/NoteDisplay";
import { db } from "~/utils/db.server";

type LoaderData = { note: Note };

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  if (!data) {
    return {
      title: "No note",
      description: "Note not found",
    };
  }
  return {
    title: `"${data.note.id}"`,
    description: "Your note",
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const note = await db.note.findUnique({ where: { id: params.noteId } });
  if (!note) {
    throw new Response("Note not found", { status: 404 });
  }
  const data: LoaderData = { note };
  return json(data);
};

export default function NoteRoute() {
  const data = useLoaderData<LoaderData>();

  return <NoteDisplay note={data.note} />;
}
