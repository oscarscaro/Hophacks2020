import React from "react";
import { Navbar } from "react-bootstrap";

export default ({ name }) => (
  <Navbar variant="dark" className="justify-content-center">
    <Navbar.Text
      style={{
        fontFamily: "arial",
        fontWeight: 900,
        letterSpacing: ".5rem",
        textTransform: "uppercase",
        textAlign: "center",
      }}
      href="/"
    >
      raw data from usda & ca gov
    </Navbar.Text>
  </Navbar>
);
