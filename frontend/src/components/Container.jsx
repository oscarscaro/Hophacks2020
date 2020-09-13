import React from "react";

export default ({ background, children }) => (
  <div
    style={{
      background: background,
      backgroundBlendMode: "multiply,multiply",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row",
    }}
  >
    {children}
  </div>
);
