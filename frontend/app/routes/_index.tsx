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

    if (!searchQuery)
      return { commits: null, codeChanged: null, statusCode: 400 };

    const { commits, statusCode } = await fetchCommits(searchQuery);

    if (statusCode !== 200) {
      return { commits, codeChanged: null, statusCode };
    }

    const promises = commits.map((commit) =>
      fetchCommitSHA(searchQuery, commit.sha)
    );

    const codeChanged = await Promise.all(promises);

    return { commits, codeChanged, statusCode };
  } catch (error) {
    return { commits: null, codeChanged: null, statusCode: 500 };
  }
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const values = Object.fromEntries(formData);

  return redirect(`?search=${values?.search}`);
}

export default function Index() {
  const { commits, codeChanged, statusCode } = useLoaderData<typeof loader>();

  return (
    <Flex direction="column">
      <HeaderCustom />
      <Container w={1000}>
        <Form method="post">
          <SearchInput />
        </Form>
        {statusCode === 200 ? (
          <Text>
            {
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {commits!.map((commit, index) => (
                  <li key={commit.sha || index}>
                    <CommitCard
                      commit={commit}
                      codeChanged={(codeChanged && codeChanged[index]) ?? ""}
                    />
                  </li>
                ))}
              </ul>
            }
          </Text>
        ) : statusCode === 404 || statusCode === 400 ? (
          <Container mt={200}>
            <Text align="center">
              Sorry, the repository could not be found. Please double-check the
              repository URL and try again
            </Text>
          </Container>
        ) : statusCode === 403 ? (
          <Container mt={200}>
            <Text align="center">
              API rate limit exceeded (But here's the good news: Authenticated
              requests get a higher rate limit. Check out the documentation for
              more details.)
            </Text>
          </Container>
        ) : (
          <Container mt={200}>
            <Text align="center">
              You may be using the wrong GITHUB_TOKEN. Please double-check the
              token and try again
            </Text>
          </Container>
        )}
      </Container>
    </Flex>
  );
}
