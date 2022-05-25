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
  width: 30rem;
  padding: 16px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 4px 8px 16px hsl(0deg 0% 0% / 0.25);
`;

export default NoteDisplay;
