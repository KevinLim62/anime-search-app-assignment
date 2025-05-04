import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/layout/navbar.tsx", [
    index("./routes/animeSearchPage.tsx"),
    route("/anime/:id", "./routes/animeResultPage.tsx"),
  ]),
] satisfies RouteConfig;
