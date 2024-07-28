import {
  CheckIcon,
  ClockIcon,
  XCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function FacturaStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-yellow-100 text-yellow-700": status === "Por Aprobar",
          "bg-blue-100 text-blue-700": status === "Por Pagar",
          "bg-green-100 text-green-700": status === "Pagada",
          "bg-red-100 text-red-700": status === "Rechazada",
        }
      )}
    >
      {status === "Por Aprobar" && (
        <>
          Por Aprobar
          <ClockIcon className="ml-1 w-4 text-yellow-700" />
        </>
      )}
      {status === "Por Pagar" && (
        <>
          Por Pagar
          <CreditCardIcon className="ml-1 w-4 text-blue-700" />
        </>
      )}
      {status === "Pagada" && (
        <>
          Pagada
          <CheckIcon className="ml-1 w-4 text-green-700" />
        </>
      )}
      {status === "Rechazada" && (
        <>
          Rechazada
          <XCircleIcon className="ml-1 w-4 text-red-700" />
        </>
      )}
    </span>
  );
}
