import { useMantineColorScheme } from "@mantine/core";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  github,
  nightOwl,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Highlighter({ code }: { code: string }) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <SyntaxHighlighter language="typescript" style={dark ? nightOwl : github}>
      {code}
    </SyntaxHighlighter>
  );
}
