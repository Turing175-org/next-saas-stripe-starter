import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Separator } from "@/components/ui/separator";

export default async function page() {

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Exchanges"
        text="Create and manage exchange accounts."
      />
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <h1 className='text-center text-4xl font-bold'>Exchanges Under Construction</h1>
        <p className='text-center text-base text-muted-foreground'>
          This page is under construction. Please check back later.
        </p>
        <Separator className="my-2" />
        {/* <h1 className='text-center text-2xl font-bold'>Goal of this page :</h1> 
        <p>Server-side sorting, filtering, and pagination.</p> 
        <p> Means users can share filtered table by just sharing URL.</p> */}
      </div>
    </DashboardShell>
  );
}
