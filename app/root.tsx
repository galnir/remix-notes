import font from "@fontsource/open-sans/400.css";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import GlobalStyles from "./components/GlobalStyles";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Notes App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: font,
    },
  ];
};

function Document({
  children,
  title = `Notes App`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en" style={{ fontFamily: "open-sans, sans-serif" }}>
      <head>
        <title>{title}</title>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
        <GlobalStyles />
      </head>
      <body>
        {children}
        <LiveReload />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
