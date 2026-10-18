import { createElement } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
export { routes } from "./data/routes";
export { faqGroups } from "./data/site";
export function render(pathname: string) {
  return renderToString(createElement(App, { pathname }));
}
