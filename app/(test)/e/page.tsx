import { getExchangeAPI } from "@/actions/exchange";
import { ExchangeApiInfo } from "@/app/(dashboard)/exchanges/page";
import { exchangeApiInfoColumns } from "@/app/_components/columns";
import { CreateExchangeDialog } from "@/app/_components/create-exchange-dialog";
import { DataTable } from "@/app/_components/data-table";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { getCurrentUser } from "@/lib/session";

const mockData: ExchangeApiInfo[] = [
  {
    id: '1',
    userId: '1',
    exchangeName: 'Binance',
    apiKey: 'api-key-1',
    secretKey: 'secret-key-1',
    passphrase: 'passphrase-1',
    description: 'Binance account',
  },
  {
    id: '2',
    userId: '1',
    exchangeName: 'Coinbase',
    apiKey: 'api-key-2',
    secretKey: 'secret-key-2',
    passphrase: 'passphrase-2',
    description: 'Coinbase account',
  }
];

async function fetchExchangeAPIs(userId) {
  try {
    const data = await getExchangeAPI(userId);
    console.log('Exchange APIs:', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function ExchangePage() {
  // const user = await getCurrentUser();
  const user = 1;
  
  if (user) {
    // const data = await fetchExchangeAPIs(user.id);
    const data = await fetchExchangeAPIs("clxiz8v0z00004iggqdpyuyv3");

  }


  return (
    <DashboardShell>
      <DashboardHeader
        heading="Exchanges"
        text="Create and manage exchange accounts."
      />
      {/* <div className='flex h-full w-full flex-col items-center justify-center'> */}
      <div className=''>
      
        {/* <CreateExchangeDialog userid={user?.id} /> */}
        <CreateExchangeDialog userid='userid' />

        <DataTable data={mockData} columns={exchangeApiInfoColumns} />

      </div>
    </DashboardShell>
  );
}

