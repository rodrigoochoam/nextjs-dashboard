//NO FUNCIONA FEATURE PENDIENTE

"use client";

import { FacturaForm } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateFactura, State } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function EditFacturaForm({ factura }: { factura: FacturaForm }) {
  const initialState: State = { message: null, errors: {} };
  const updateFacturaWithId = updateFactura.bind(null, factura.id);
  const [state, dispatch] = useFormState(updateFacturaWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Fecha Timbrado */}
        <div className="mb-4">
          <label
            htmlFor="fecha_timbrado"
            className="mb-2 block text-sm font-medium"
          >
            Fecha Timbrado
          </label>
          <input
            id="fecha_timbrado"
            name="fecha_timbrado"
            type="date"
            defaultValue={factura.fecha_timbrado.split("T")[0]}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="fecha_timbrado-error"
          />
          <div id="fecha_timbrado-error" aria-live="polite" aria-atomic="true">
            {state.errors?.fecha_timbrado &&
              state.errors.fecha_timbrado.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* RFC Emisor */}
        <div className="mb-4">
          <label
            htmlFor="rfc_emisor"
            className="mb-2 block text-sm font-medium"
          >
            RFC Emisor
          </label>
          <input
            id="rfc_emisor"
            name="rfc_emisor"
            type="text"
            defaultValue={factura.rfc_emisor}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="rfc_emisor-error"
          />
          <div id="rfc_emisor-error" aria-live="polite" aria-atomic="true">
            {state.errors?.rfc_emisor &&
              state.errors.rfc_emisor.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Nombre Emisor */}
        <div className="mb-4">
          <label
            htmlFor="nombre_emisor"
            className="mb-2 block text-sm font-medium"
          >
            Nombre Emisor
          </label>
          <input
            id="nombre_emisor"
            name="nombre_emisor"
            type="text"
            defaultValue={factura.nombre_emisor}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="nombre_emisor-error"
          />
          <div id="nombre_emisor-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nombre_emisor &&
              state.errors.nombre_emisor.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Descripcion */}
        <div className="mb-4">
          <label
            htmlFor="descripcion"
            className="mb-2 block text-sm font-medium"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            defaultValue={factura.descripcion}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="descripcion-error"
          />
          <div id="descripcion-error" aria-live="polite" aria-atomic="true">
            {state.errors?.descripcion &&
              state.errors.descripcion.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Importe */}
        <div className="mb-4">
          <label htmlFor="importe" className="mb-2 block text-sm font-medium">
            Importe
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="importe"
                name="importe"
                type="number"
                step="0.01"
                defaultValue={factura.importe}
                placeholder="Enter amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="importe-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="importe-error" aria-live="polite" aria-atomic="true">
            {state.errors?.importe &&
              state.errors.importe.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* IVA */}
        <div className="mb-4">
          <label htmlFor="iva" className="mb-2 block text-sm font-medium">
            IVA
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="iva"
                name="iva"
                type="number"
                step="0.01"
                defaultValue={factura.iva}
                placeholder="Enter IVA"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="iva-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="iva-error" aria-live="polite" aria-atomic="true">
            {state.errors?.iva &&
              state.errors.iva.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Total */}
        <div className="mb-4">
          <label htmlFor="total" className="mb-2 block text-sm font-medium">
            Total
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="total"
                name="total"
                type="number"
                step="0.01"
                defaultValue={factura.total}
                placeholder="Enter total"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="total-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="total-error" aria-live="polite" aria-atomic="true">
            {state.errors?.total &&
              state.errors.total.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Factura Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the factura status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="por_aprobar"
                  name="status"
                  type="radio"
                  value="Por Aprobar"
                  defaultChecked={factura.status === "Por Aprobar"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="por_aprobar"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Por Aprobar <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="pagada"
                  name="status"
                  type="radio"
                  value="Pagada"
                  defaultChecked={factura.status === "Pagada"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pagada"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Pagada <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/facturas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Factura</Button>
      </div>
    </form>
  );
}
