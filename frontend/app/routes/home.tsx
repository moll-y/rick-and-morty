import type { Route } from "./+types/character";
import { Link } from "react-router";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import {
  AdjustmentsVerticalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Rick and Morty" },
    { name: "description", content: "Welcome to Rick and Morty!" },
  ];
}

export default function Home() {
  return <></>;
}
