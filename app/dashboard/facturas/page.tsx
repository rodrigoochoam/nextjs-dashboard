import { fetchFilteredFacturas, fetchFacturasPages } from "@/app/lib/data";
import { Suspense } from "react";
import FacturasTable from "@/app/ui/facturas/table";
import { FacturasTableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/facturas/pagination";
import Search from "@/app/ui/search";
import { CreateFactura } from "@/app/ui/facturas/buttons";
import { lusitana, myFont } from "@/app/ui/fonts";

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

  const totalPages = await fetchFacturasPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${myFont.className} text-2xl`}>Facturas</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search facturas..." />
        <CreateFactura />
      </div>
      <Suspense key={query + currentPage} fallback={<FacturasTableSkeleton />}>
        <FacturasTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
