import { Options, render } from "@react-email/render";
import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";

const GENERATED_DIR = "__generated__";

type Template = {
  name: string;
  component: {
    default: React.JSXElementConstructor<any>;
  };
};

const templates: Record<string, Template> = {
  pdf: {
    name: "pdf",
    component: require("../templates/pdf"),
  },
  table: {
    name: "table",
    component: require("../templates/table"),
  },
};

function getComponentString(
  Component: Template["component"],
  options?: Options | undefined
) {
  const Element = Component.default;
  const emailHtml = render(<Element />, {
    pretty: true,
    ...options,
  });

  const pretty = prettier.format(emailHtml, {
    htmlWhitespaceSensitivity: "css",
    parser: "html",
  });

  return pretty;
}

function build() {
  Object.keys(templates).forEach((t) => {
    const template = templates[t];
    const templateString = getComponentString(template.component);

    fs.writeFile(
      path.join(__dirname, "../" + GENERATED_DIR, `${template.name}.html`),
      templateString,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}

build();
