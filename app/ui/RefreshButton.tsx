"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { myFont } from "@/app/ui/fonts";

export default function RefreshButton() {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <button
      onClick={handleRefresh}
      className={`${myFont.className} flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2`}
    >
      <ArrowPathIcon className="h-5 w-5" />
      <span>Recargar</span>
    </button>
  );
}
