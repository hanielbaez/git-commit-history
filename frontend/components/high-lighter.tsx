import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Highlighter({ code }: { code: string }) {
  return <SyntaxHighlighter style={docco}>{code}</SyntaxHighlighter>;
}
