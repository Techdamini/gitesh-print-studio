import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteShell } from "@/components/site/SiteShell";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gitesh Enterprises — Premium Printing in Ludhiana" },
      { name: "description", content: "Flex, LED boards, ID cards, trophies & custom prints in Ludhiana. theme is colourful with printier pictures" },
      { name: "author", content: "Gitesh Enterprises" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Gitesh Enterprises — Premium Printing in Ludhiana" },
      { name: "twitter:title", content: "Gitesh Enterprises — Premium Printing in Ludhiana" },
      { property: "og:description", content: "Flex, LED boards, ID cards, trophies & custom prints in Ludhiana. theme is colourful with printier pictures" },
      { name: "twitter:description", content: "Flex, LED boards, ID cards, trophies & custom prints in Ludhiana. theme is colourful with printier pictures" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/93ee600e-27bd-4ee7-b1a7-c11fd239599c" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/93ee600e-27bd-4ee7-b1a7-c11fd239599c" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <SiteShell>
      <Outlet />
    </SiteShell>
  );
}
