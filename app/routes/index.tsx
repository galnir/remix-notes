import styled from "styled-components";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <IndexTitle>Hello World</IndexTitle>
      <Link to="/notes" style={{ textDecoration: "none" }}>
        <h2>Click here to view your notes</h2>
      </Link>
    </div>
  );
}

export function ErrorBoundary() {
  return <div className="error-container">An error occured</div>;
}

const IndexTitle = styled.h1`
  color: green;
`;
