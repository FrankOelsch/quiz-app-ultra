import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Nav() {
  return (
    <Footer>
      <StyledNav>
        <StyledNavLink to="/" end>home</StyledNavLink>
        <StyledNavLink to="/bookmark">bookmark</StyledNavLink>
        <StyledNavLink to="/new">add_box</StyledNavLink>
      </StyledNav>
    </Footer>
  );
}

const StyledNavLink = styled(NavLink)`
  height: 60px;
  width: 33.3333%;
  text-align: center;
  background-color: azure;
  text-decoration: none;
  border: black solid 1px;
  transition: 0.5s;

  font-family: "Material Symbols Outlined";
  font-size: 48px;
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
  color: darkolivegreen;

  &.active {
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
    background-color: cadetblue;
    color: white;
  }

  &:hover {
    background-color: cadetblue;
    color: white;
  }
`;

const Footer = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  margin-top: 20px;
  z-index: 20;
`;

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
