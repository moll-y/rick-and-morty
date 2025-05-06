import type { Route } from "./+types/character";
import { Link } from "react-router";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Character({ params }: Route.ComponentProps) {
  console.log("params: ", params);
  return (
    <div>
      <div className="pb-2">
        <span className="relative inline-block">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="size-16 rounded-full"
          />
          <div className="absolute -right-3.5 bottom-0 flex justify-center items-center size-7 rounded-full bg-white ring-2 ring-white">
            <HeartIcon
              aria-hidden="true"
              className="size-5 text-[#63D838]"
              style={{ fill: "#63D838" }}
            />
          </div>
        </span>
        <div>
          <h2 className="text-2xl leading-8 font-bold text-gray-900">
            Abadango Cluster Princess
          </h2>
        </div>
      </div>
      <div>
        <div className="group block shrink-0 py-4">
          <p className="text-base leading-6 font-semibold text-gray-900">
            Specie
          </p>
          <p className="text-base leading-6 font-normal text-gray-500">Alien</p>
        </div>
        <div className="group block shrink-0 py-4 border-y border-y-gray-200">
          <p className="text-base leading-6 font-semibold text-gray-900">
            Status
          </p>
          <p className="text-base leading-6 font-normal text-gray-500">Alive</p>
        </div>
        <div className="group block shrink-0 py-4">
          <p className="text-base leading-6 font-semibold text-gray-900">
            Origin
          </p>
          <p className="text-base leading-6 font-normal text-gray-500">Earth</p>
        </div>
      </div>
    </div>
  );
}
