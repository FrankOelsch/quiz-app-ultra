import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Nav({isEdit}) {
  return (
    <Footer>
      <nav>
        <NavLink className="navlink" to="/" end>home</NavLink>
        <NavLink className="navlink" to="/bookmark">bookmark</NavLink>
        <NavLink className="navlink" to="/new">add_box</NavLink>
        {isEdit ? (<NavLink className="navlinkEdit" to="/:cardID">edit</NavLink>) : ("")}
      </nav>
    </Footer>
  );
}

const Footer = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  margin-top: 20px;
  z-index: 20;
  
  nav {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  
  .navlink,
  .navlinkEdit
  {
    height: 60px;
    width: 33.3333%;
    text-align: center;
    background-color: azure;
    text-decoration: none;
    border: black solid 1px;
    transition: 0.5s;
    font-family: "Material Symbols Outlined", sans-serif;
    font-size: 48px;
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
    color: darkolivegreen;
  }
  .navlinkEdit {
    pointer-events: none;
  }
  .navlink.active,
  .navlinkEdit.active
  {
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
    background-color: cadetblue;
    color: white;
  }
  .navlink:hover {
    background-color: cadetblue;
    color: white;
  }

  .material-icons {
    font-family: "Material Icons", sans-serif;
    color: black;
  }
  .material-icons-outlined {
    font-family: "Material Icons Outlined", sans-serif;
    color: black;
  }
  .material-icons.md-18 {
    font-size: 18px;
  }
  .material-icons.md-24 {
    font-size: 24px;
  }
  .material-icons.md-36 {
    font-size: 36px;
  }
  .material-icons.md-48 {
    font-size: 48px;
  }
  .material-icons-outlined.md-18 {
    font-size: 18px;
  }
  .material-icons-outlined.md-24 {
    font-size: 24px;
  }
  .material-icons-outlined.md-36 {
    font-size: 36px;
  }
  .material-icons-outlined.md-48 {
    font-size: 48px;
  }
  .material-icons.md-dark {
    color: rgba(0, 0, 0, 0.54);
  }
  .material-icons.md-dark.md-inactive {
    color: rgba(0, 0, 0, 0.26);
  }
  .material-icons-outlined.md-dark {
    color: rgba(0, 0, 0, 0.54);
  }
  .material-icons-outlined.md-dark.md-inactive {
    color: rgba(0, 0, 0, 0.26);
  }
  .material-icons.md-light {
    color: rgba(255, 255, 255, 1);
  }
  .material-icons.md-light.md-inactive {
    color: rgba(255, 255, 255, 0.3);
  }
  .material-icons-outlined.md-light {
    color: rgba(255, 255, 255, 1);
  }
  .material-icons-outlined.md-light.md-inactive {
    color: rgba(255, 255, 255, 0.3);
  }
  .material-icons.grey {
    color: grey;
  }
  .material-icons.grey {
    color: grey;
  }
  .material-icons-outlined.white {
    color: white;
  }
  .material-icons-outlined.white {
    color: white;
  }

  .material-symbols-outlined {
    font-family: "Material Symbols Outlined", sans-serif;
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
    color: grey;
  }
  .material-symbols-outlined.active {
    font-family: "Material Symbols Outlined", sans-serif;
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
  }
  .material-symbols-outlined.md-48 {
    font-size: 48px;
  }
  .material-symbols-outlined.md-60 {
    font-size: 60px;
  }
  .material-symbols-outlined.white {
    color: white;
  }
  .material-symbols-outlined.darkolivegreen {
    color: darkolivegreen;
  }
`;
