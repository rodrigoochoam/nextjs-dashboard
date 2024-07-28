import { UpdateFactura, DeleteFactura } from "@/app/ui/facturas/buttons";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredFacturas, fetchAllFacturas } from "@/app/lib/data";
import FacturaStatus from "@/app/ui/facturas/status";
import { unstable_noStore as noStore } from "next/cache";

export default async function FacturasTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  noStore();
  const facturas = query
    ? await fetchFilteredFacturas(query, currentPage)
    : await fetchAllFacturas(currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {facturas?.map((factura) => (
              <div
                key={factura.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{factura.nombre_emisor}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {factura.rfc_emisor}
                    </p>
                  </div>
                  <FacturaStatus status={factura.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(factura.total)}
                    </p>
                    <p>{formatDateToLocal(factura.fecha_timbrado)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateFactura id={factura.id} />
                    <DeleteFactura id={factura.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Emisor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  RFC
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha Timbrado
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {facturas?.map((factura) => (
                <tr
                  key={factura.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{factura.nombre_emisor}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {factura.rfc_emisor}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(factura.fecha_timbrado)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {`$${Number(factura.total).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} MXN`}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <FacturaStatus status={factura.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateFactura id={factura.id} />
                      <DeleteFactura id={factura.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* function FacturaStatus({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
        status === "Pagada"
          ? "bg-green-500 text-white"
          : status === "Rechazada"
          ? "bg-red-500 text-white"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {status}
    </span>
  );
}
 */
