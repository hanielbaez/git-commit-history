import type { V2_MetaFunction } from "@remix-run/node";

import { HeaderCustom, TITLE } from "../../components/header";

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
  return <HeaderCustom />;
}
