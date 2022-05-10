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

export default function App() {
  return (
    <html lang="en" style={{ fontFamily: "open-sans, sans-serif" }}>
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
        <GlobalStyles />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
