import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";

interface PDFProps {
  url: string;
}

const containerStyle: React.CSSProperties = {
  width: "21cm",
  height: "29.7cm",
  background: "red",
};

const PDF: React.FC<Readonly<PDFProps>> = ({ url }) => {
  return (
    <Html lang="en">
      <section style={containerStyle}>
        <Button href={url}>PDF</Button>
      </section>
    </Html>
  );
};

export default PDF;
