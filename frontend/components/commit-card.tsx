import { Card, Text, Avatar, Input, Group } from "@mantine/core";

import { type Commit } from "../app/server/github.server";
import Highlighter from "./high-lighter";
import ButtonCopy from "./button-copy";

export default function CommitCard({
  commit,
  codeChanged,
}: {
  commit: Commit;
  codeChanged: string;
}) {
  const {
    sha,
    commit: {
      message,
      author: { name, email },
    },
    html_url,
    committer,
  } = commit;

  return (
    <Card shadow="xs" padding="lg" mx="auto" my="md" maw={700}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <Avatar
          src={`https://avatars.githubusercontent.com/u/${committer.id}`}
          size="lg"
        />
        <div style={{ marginLeft: "1rem" }}>
          <Text size="xl" weight={700} style={{ marginBottom: "0.5rem" }}>
            {name}
          </Text>
          <Text size="sm" color="dimmed">
            {email}
          </Text>
        </div>
      </div>
      <Text size="lg" weight={700} style={{ marginBottom: "1rem" }}>
        {message}
      </Text>
      <Group>
        <Input value={sha} readOnly />
        <ButtonCopy value={sha} />
      </Group>
      <Highlighter code={codeChanged} />
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        <Text size="sm" color="blue">
          View on GitHub
        </Text>
      </a>
    </Card>
  );
}
