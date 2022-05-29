import styled from "styled-components";

function ErrorContainer({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  border-radius: 4px;
  color: white;
  padding: 1rem;
  margin: 1rem;
`;

export default ErrorContainer;
