import { Outlet } from "react-router";
import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Anime Search App" },
    { name: "description", content: "Anime Search App" },
  ];
}

export default function Navbar() {
  return (
    <>
      <header className="bg-indigo-700 text-white">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold">Anime Search App</h1>
        </div>
      </header>
      <Outlet />
    </>
  );
}
