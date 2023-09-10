import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Highlighter({ code }: { code: string }) {
  return (
    <SyntaxHighlighter language="typescript" style={github}>
      {code}
    </SyntaxHighlighter>
  );
}
