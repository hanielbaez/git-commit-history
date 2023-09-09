import { ClientProvider } from "@mantine/remix";
import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrate } from "react-dom";

startTransition(() => {
  hydrate(
    <ClientProvider>
      <RemixBrowser />
    </ClientProvider>,
    document
  );
});
