import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function SupplierStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-green-100 text-green-700": status === "Completo",
          "bg-yellow-100 text-yellow-700": status === "Incompleto",
        }
      )}
    >
      {status === "Completo" && (
        <>
          Completo
          <CheckCircleIcon className="ml-1 w-4 text-green-700" />
        </>
      )}
      {status === "Incompleto" && (
        <>
          Incompleto
          <ExclamationCircleIcon className="ml-1 w-4 text-yellow-700" />
        </>
      )}
    </span>
  );
}
