import { rem, Header, Group, Highlight, Stack } from "@mantine/core";
import { ColorToggle } from "./color-toggle";

const HEADER_HEIGHT = rem(60);
const TITLE = "Github commit history";
const WRONG_TITLE = "Jithub commit history";

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

        <ColorToggle />
      </Group>
    </Header>
  );
}
