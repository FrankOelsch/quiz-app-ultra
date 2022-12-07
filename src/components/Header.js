import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>Quiz App Ultra</StyledH1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 8px;
  margin-bottom: 20px;
  background-color: cadetblue;
  color: white;
  z-index: 20;
`

const StyledH1 = styled.h1`
  font-family: "Abel", sans-serif;
  font-size: 30px;
  text-align: center;
`