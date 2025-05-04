import { Link } from "react-router";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";

interface ErrorLoaderProps {
  data: {
    error: string;
  };
  resetEnable?: boolean;
}

export default function ErrorLoader({
  data,
  resetEnable = true,
}: ErrorLoaderProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-center">{data.error}</h2>
      {resetEnable && (
        <Link to="/" viewTransition>
          <Button
            variant="default"
            className="flex mx-auto my-2 w-full md:w-auto bg-indigo-700 hover:bg-indigo-800 cursor-pointer"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </Link>
      )}
    </div>
  );
}
