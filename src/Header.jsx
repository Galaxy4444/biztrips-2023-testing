import React from "react";
// import styles from "./App.css"

export default function Header() {
  return (
    <header data-testid="heading">
      <nav>
        <ul>
          <li>
            <img
              width="150px"
              alt="biztrips"
              src="/images/logo.png"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
