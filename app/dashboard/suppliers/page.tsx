import { Metadata } from "next";
import SuppliersTable from "@/app/ui/suppliers/table";
import Search from "@/app/ui/search";
import { CreateSupplier } from "@/app/ui/suppliers/buttons";

export const metadata: Metadata = {
  title: "Suppliers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Suppliers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search suppliers..." />
        <CreateSupplier />
      </div>
      <SuppliersTable query={query} currentPage={currentPage} />
    </div>
  );
}
