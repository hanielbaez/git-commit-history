import { ActionIcon, rem, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconCheck } from "@tabler/icons-react";

export default function ButtonCopy({ value }: { value: string }) {
  const clipboard = useClipboard();
  return (
    <Tooltip
      label="Copied!"
      offset={5}
      position="bottom"
      radius="xl"
      transitionProps={{ duration: 100, transition: "slide-down" }}
      opened={clipboard.copied}
    >
      <ActionIcon
        variant="light"
        radius="xl"
        size="md"
        styles={{
          root: { paddingRight: rem(14), height: rem(48) },
        }}
        onClick={() => clipboard.copy(value)}
      >
        {clipboard.copied ? (
          <IconCheck size="1.2rem" stroke={1.5} />
        ) : (
          <IconCopy size="1.2rem" stroke={1.5} />
        )}
      </ActionIcon>
    </Tooltip>
  );
}
