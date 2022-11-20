import Blocks from "editorjs-blocks-react-renderer";
import React from "react";

import { parseEditorJSData } from "@/lib/util";

export interface RichTextProps {
  jsonStringData?: string;
}

export function RichText({ jsonStringData }: RichTextProps) {
  const data = parseEditorJSData(jsonStringData);
  if (!data) {
    return null;
  }

  return (
    <article className="prose-base">
      <Blocks
        data={data}
        config={{
          header: {
            className: "font-bold",
          },
          paragraph: {
            className: "text-base",
          },
        }}
      />
    </article>
  );
}

export default RichText;
