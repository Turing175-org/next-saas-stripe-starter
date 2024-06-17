import { CreateExchangeDialog } from "@/app/_components/create-exchange-dialog";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { getCurrentUser } from "@/lib/session";
import { useState } from "react";

interface ApiAccount {
  id: number
  exchange: string
  apiKey: string
  apiSecret: string
}
  
export default async function ExchangePage() {
  const user = await getCurrentUser();

  // if (!user) {
  //   redirect("/login");
  // }
  
  // const [apiAccounts, setApiAccounts] = useState<ApiAccount[]>([])
  // const [newApi, setNewApi] = useState<ApiAccount>({
  //   id: Date.now(),
  //   exchange: '',
  //   apiKey: '',
  //   apiSecret: '',
  // })
  // const [showForm, setShowForm] = useState(false)

  // const handleAddApi = () => {
  //   setApiAccounts([...apiAccounts, newApi])
  //   setNewApi({ id: Date.now(), exchange: '', apiKey: '', apiSecret: '' })
  //   setShowForm(false)
  // }

  const columns = [
    {
      Header: 'Exchange',
      accessor: 'exchange',
    },
    {
      Header: 'API Key',
      accessor: 'apiKey',
    },
    {
      Header: 'API Secret',
      accessor: 'apiSecret',
    },
  ]

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = useTable({ columns, data: apiAccounts })

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


      </div>
    </DashboardShell>
  );
}

