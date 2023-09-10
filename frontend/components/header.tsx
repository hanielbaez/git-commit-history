import { rem, Header, Group, Highlight, Stack, Text } from "@mantine/core";
import { ColorToggle } from "./color-toggle";

const HEADER_HEIGHT = rem(60);
export const TITLE = "Github Commit History";
const WRONG_TITLE = "Jithub Commit History";

export function HeaderCustom() {
  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Group position="apart" p="md">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Highlight highlightColor="red" m={0} highlight={WRONG_TITLE}>
            {`- ${WRONG_TITLE}`}
          </Highlight>
          <Highlight highlightColor="lime" m={0} highlight={TITLE}>
            {`+ ${TITLE}`}
          </Highlight>
        </div>
        <Stack justify="center" align="baseline"></Stack>
        <Group>
          <a
            href="http://localhost:3000/api"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#FFFFFF",
            }}
          >
            <Text size="sm">API Documentation</Text>
          </a>
          <ColorToggle />
        </Group>
      </Group>
    </Header>
  );
}
