import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Nav>
      <div>
        <ol>
          <li>
            <Link to="/sezar">
              <h4>Sezar</h4>
            </Link>
          </li>
          <li>
            <Link to="/vijner">
              <h4>Vijner</h4>
            </Link>
          </li>
          <li>
            <Link to="/vernam">
              <h4>Vernam</h4>
            </Link>
          </li>
          <li>
            <Link to="/affin">
              <h4>Affin</h4>
            </Link>
          </li>
        </ol>
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  ol {
    li {
      width: max-content;
      margin-bottom: 10px;
    }
  }
`;
