import { TextInput, type TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export function SearchInput(props: TextInputProps) {
  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="xl"
      maw={700}
      type="search"
      placeholder="Search commits from any public repository"
      defaultValue="https://github.com/hanielbaez/git-commit-history"
      rightSectionWidth={42}
      {...props}
    />
  );
}
