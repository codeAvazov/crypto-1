import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div>
        <ul>
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
        </ul>
      </div>
    </nav>
  );
}
