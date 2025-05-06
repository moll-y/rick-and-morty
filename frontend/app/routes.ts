import {
  type RouteConfig,
  layout,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/home.tsx"),
    route("character/:id", "routes/character.tsx"),
  ]),
] satisfies RouteConfig;
