import { basename } from "path";

export type Route = {
  path: string;
  type: RouteSpecifier;
  source: string;
  compiled: string;
};

export type RouteSpecifier = {
  markup: "markdown" | "pulldown";
  markdown?: "commonmark" | "github" | "simplemark";
  cssPath?: string;
  jsPath?: string;
};

export function CreateRoute(
  path: string,
  source: string,
  type: RouteSpecifier,
  compiled: string
): Route {
  return {
    path,
    source,
    type,
    compiled
  };
}

export class Routes {
  private routes: Map<String, Route>;
  constructor(routes?: Array<Route>) {
    let router = new Map();
    if (routes) {
        for (let i = 0; i<routes.length; i++) {
            router.set(basename(routes[i].path), routes[i]);
        }
    };
    this.routes = router;
  };
}
