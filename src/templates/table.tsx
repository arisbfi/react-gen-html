import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";

interface TableProps {
  url: string;
}

const containerStyle: React.CSSProperties = {
  width: "21cm",
  height: "29.7cm",
  background: "red",
};

const Table: React.FC<Readonly<TableProps>> = ({ url }) => {
  return (
    <Html lang="en">
      <section style={containerStyle}>
        <Button href={url}>Click</Button>
      </section>
    </Html>
  );
};

export default Table;
