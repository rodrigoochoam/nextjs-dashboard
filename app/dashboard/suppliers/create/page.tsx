import CreateSupplierForm from "@/app/ui/suppliers/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Suppliers", href: "/dashboard/suppliers" },
          {
            label: "Create Supplier",
            href: "/dashboard/suppliers/create",
            active: true,
          },
        ]}
      />
      <CreateSupplierForm />
    </main>
  );
}
