"use client"

import { BitGetHistoryOrder, OkxHistoryOrder } from "@/app/(marketing)/analysis/page";
import { okxOrderColumns, orderColumns } from "@/app/_components/columns";
import { DataTable } from "@/app/_components/data-table";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default async function TradersPage() {
  const [order, setOrder] = useState<BitGetHistoryOrder[]>([]);
  const [okxOrder, setOkxOrder] = useState<OkxHistoryOrder[]>([]);
  const [traderId, setTraderId] = useState<string>('');
  const [okxOraderId, setOkxTraderId] = useState<string>('');
  
  const handleOKXSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const id = formData.get('okxTraderId') as string;
    setOkxTraderId(id);
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Traders"
        text=""
      />
      {/* <div className='flex h-full w-full flex-col items-center justify-center'> */}
      <div className=''>
        
      {/* <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex"> */}
        <Tabs defaultValue="Bitget" className="space-y-4">
          <TabsList>
            <TabsTrigger value="Bitget">Bitget</TabsTrigger>
            <TabsTrigger value="binance">Binance</TabsTrigger>
            <TabsTrigger value="okx">OKX</TabsTrigger>
          </TabsList>
          <TabsContent value="Bitget" className="space-y-4">
            {/* <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"> */}
            {/* <div>
              <form onSubmit={handleBitgetOrderSubmit}>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input name="bitgetTraderId" placeholder="Search Bitget TraderId" className="pl-8" />
                </div>
              </form>
            </div> */}
            <DataTable data={order} columns={orderColumns} />
          </TabsContent>
          <TabsContent value="binance" className="space-y-4">
            <div >
              {/* <form onSubmit={handleBinanceSubmit}> */}
              <form>
                {/* <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input name="binanceTraderId" placeholder="Search Binance TraderId" className="pl-8" />
                </div> */}
              </form>
            </div>
            {/* <DataTable data={binanceOrder} columns={binanceOrderColumns} /> */}
          </TabsContent>
          <TabsContent value="okx" className="space-y-4">
            <div>
              <form onSubmit={handleOKXSubmit}>
                {/* <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input name="okxTraderId" placeholder="Search OKX TraderId" className="pl-8" />
                </div> */}
              </form>
            </div>
            <DataTable data={okxOrder} columns={okxOrderColumns} />
          </TabsContent>
        </Tabs>


      {/* </div> */}

      </div>
    </DashboardShell>
  );
}
