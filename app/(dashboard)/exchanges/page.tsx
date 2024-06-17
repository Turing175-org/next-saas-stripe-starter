import { CreateExchangeDialog } from "@/app/_components/create-exchange-dialog";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export type ExchangeApiInfo = {
  id: string;
  userId: string
  exchangeName: string;
  apiKey: string;
  secretKey: string;
  passphrase: string;
  description: string;
  // createdAt: string;
  // updatedAt: string;
};

export default async function page() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Exchanges"
        text="Create and manage exchange accounts."
      />
      {/* <div className='flex h-full w-full flex-col items-center justify-center'> */}
      <div className=''>
      
        <CreateExchangeDialog userid={user?.id} />

      </div>
    </DashboardShell>
  );
}
