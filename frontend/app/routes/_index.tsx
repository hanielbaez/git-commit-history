import type { V2_MetaFunction } from "@remix-run/node";

import { HeaderCustom, TITLE } from "../../components/header";
import { Container, Flex } from "@mantine/core";
import { SearchInput } from "../../components/search-intpu";

export const meta: V2_MetaFunction = () => {
  return [
    { title: TITLE },
    {
      name: "description",
      content:
        "Allows users to search and access information about commits made in a public Git repository",
    },
  ];
};

export default function Index() {
  return (
    <Flex align="center" direction="column">
      <HeaderCustom />
      <Container>
        <SearchInput />
      </Container>
    </Flex>
  );
}
