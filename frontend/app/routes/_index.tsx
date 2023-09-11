import {
  type ActionArgs,
  redirect,
  type LoaderArgs,
  type V2_MetaFunction,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Container, Flex, Text } from "@mantine/core";

import { HeaderCustom, TITLE } from "../../components/header";
import { SearchInput } from "../../components/search-intpu";
import { fetchCommitSHA, fetchCommits } from "../server/github.server";
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
  try {
    const urL = new URL(request.url);
    const searchQuery = urL.searchParams.get("search");

    if (!searchQuery) return { commits: null, codeChanged: null };

    const commits = await fetchCommits(searchQuery);

    if (!commits) {
      throw new Error("Failed to fetch commits.");
    }

    const promises = commits.map((commit) =>
      fetchCommitSHA(searchQuery, commit.sha)
    );

    const codeChanged = await Promise.all(promises);

    return { commits, codeChanged };
  } catch (error) {
    console.error(error);
    return { commits: null, codeChanged: null };
  }
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const values = Object.fromEntries(formData);

  return redirect(`?search=${values?.search}`);
}

export default function Index() {
  const { commits, codeChanged } = useLoaderData<typeof loader>();

  return (
    <Flex direction="column">
      <HeaderCustom />
      <Container>
        <Form method="post">
          <SearchInput />
        </Form>
        {!commits ? (
          <></>
        ) : !commits?.length ? (
          <Container mt={200}>
            <Text>
              Sorry, the repository could not be found. Please double-check the
              repository URL and try again
            </Text>
          </Container>
        ) : (
          <Text>
            {
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {commits.map((commit, index) => (
                  <li key={commit.sha || index}>
                    <CommitCard
                      commit={commit}
                      codeChanged={codeChanged[index] ?? ""}
                    />
                  </li>
                ))}
              </ul>
            }
          </Text>
        )}
      </Container>
    </Flex>
  );
}
