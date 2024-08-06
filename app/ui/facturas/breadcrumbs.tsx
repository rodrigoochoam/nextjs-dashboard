//NO FUNCIONA FEATURE PENDIENTE

import { fetchFacturaById } from "@/app/lib/data";
import EditFacturaForm from "@/app/ui/facturas/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const factura = await fetchFacturaById(id);

  if (!factura) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Facturas", href: "/dashboard/facturas" },
          {
            label: "Edit Factura",
            href: `/dashboard/facturas/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditFacturaForm factura={factura} />
    </main>
  );
}
