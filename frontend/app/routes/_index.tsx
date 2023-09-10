import { type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Flex, Text } from "@mantine/core";

import { HeaderCustom, TITLE } from "../../components/header";
import { SearchInput } from "../../components/search-intpu";
import { fetchCommits } from "../server/github.server";
import CommitCard from "../../components/commit-card";

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

export async function loader({ request }: LoaderArgs) {
  const urL = new URL(request.url);
  const searchQuery = urL.searchParams.get("search");

  if (!searchQuery) return { commits: null };

  const commits = await fetchCommits(searchQuery);

  return { commits };
}

export default function Index() {
  const { commits } = useLoaderData<typeof loader>();

  return (
    <Flex direction="column">
      <HeaderCustom />
      <Form method="post">
        <SearchInput />
      </Form>
      {!commits?.length ? (
        <Text>
          Sorry, the repository could not be found. Please double-check the
          repository URL and try again
        </Text>
      ) : (
        <Text>
          {
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {commits.map((commit, index) => (
                <li key={commit.sha || index}>
                  <CommitCard commit={commit} />
                </li>
              ))}
            </ul>
          }
        </Text>
      )}
    </Flex>
  );
}
