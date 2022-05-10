import type { Note } from "@prisma/client";
import styled from "styled-components";

type NoteDisplayProps = {
  note: Note;
};

function NoteDisplay({ note }: NoteDisplayProps) {
  return (
    <NoteWrapper>
      <h2>{note.title}</h2>
      <h3>{note.description}</h3>
    </NoteWrapper>
  );
}

const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: red;
`;

export default NoteDisplay;
