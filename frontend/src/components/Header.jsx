import React from "react";
import { Navbar } from "react-bootstrap";

export default ({ name }) => (
  <Navbar variant="dark">
    <Navbar.Brand
      style={{
        fontFamily: "arial",
        fontWeight: 900,
        letterSpacing: ".5rem",
        textTransform: "uppercase",
      }}
      href="/"
    >
      {name}
    </Navbar.Brand>
  </Navbar>
);
