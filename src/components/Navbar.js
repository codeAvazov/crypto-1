import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const list = [
  { id: uuidv4(), to: "/sezar", title: "Sezar" },
  { id: uuidv4(), to: "/vijner", title: "Vijner" },
  { id: uuidv4(), to: "/vernam", title: "Vernam" },
  { id: uuidv4(), to: "/affin", title: "Affin" },
  { id: uuidv4(), to: "/a51", title: "A 5/1" },
  { id: uuidv4(), to: "/rc4", title: "RC4 " },
];

export default function Navbar() {
  return (
    <Nav>
      <div>
        <ol>
          {list.map(({ id, to, title }) => (
            <li key={id}>
              <Link to={to}>
                <h4>{title}</h4>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  margin-bottom: 4rem;

  ol {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

    li {
    }
  }
`;
