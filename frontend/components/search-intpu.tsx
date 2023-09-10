import { ActionIcon, Input, type TextInputProps } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

export function SearchInput(props: TextInputProps) {
  return (
    <Input
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="xl"
      maw={700}
      type="search"
      name="search"
      placeholder="Search commits from any public repository"
      defaultValue="https://github.com/hanielbaez/git-commit-history"
      rightSectionWidth={45}
      m="auto"
      rightSection={
        <ActionIcon type="submit">
          <IconArrowRight />
        </ActionIcon>
      }
    />
  );
}
