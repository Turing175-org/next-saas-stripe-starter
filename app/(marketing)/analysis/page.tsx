"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { DataTable } from "@/app/_components/data-table"
import { okxOrderColumns, orderColumns } from "@/app/_components/columns"
import { Input } from "@/components/ui/input-table"
import { Separator } from "@/components/ui/separator"

export type BitGetHistoryOrder = {
  trackingNo: string;
  symbol: string;
  openOrderId: string;
  closeOrderId: string;
  posSide: string;
  openLeverage: string;
  openPriceAvg: string;
  openTime: string;
  openSize: string;
  closeSize: string;
  closeTime: string;
  closePriceAvg: string;
  openFee: string;
  closeFee: string;
  marginMode: string;
  followCount: string;
  marginAmount: string;
  cTime: string;
  traderId: string;
};
export type OkxHistoryOrder = {
  subPosId: string;
  ccy: string;
  closeAvgPx: string;
  closeTime: string;
  instId: string;
  instType: string;
  lever: string;
  margin: string;
  mgnMode: string;
  openAvgPx: string;
  openTime: string;
  pnl: string;
  pnlRatio: string;
  posSide: string;
  subPos: string;
  uniqueCode: string;
};

async function getBitgetHistoryOrder(traderId: string) {
  try {
    const response = await fetch(`https://45.77.180.194:8000/api/bitget/order/history?traderId=${traderId}&pageSize=5000`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const {data, pageCount} = await response.json() as { data: BitGetHistoryOrder[], pageCount: number }
    console.log("getBitgetHistoryOrder:", data.length);
    // toast.error("Fake An unknown error occurred, check console for more message", {
    //   description: "Your name was not updated. Please try again.",
    //   position: "top-center",
    //   duration: 5000,
    //   // cancel: {
    //   //   label: 'Cancel',
    //   //   onClick: () => console.log('Cancel!'),
    //   // },
    // });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unknown error occurred, check console for more message", {
        position: "top-center",
      });
    }
    console.error("Failed to fetch order data:", error);
    return [];
  }
}
async function getOkxHistoryOrder(traderId: string) {
  try {
    const response = await fetch(`https://45.77.180.194:8000/api/okx/order/history?uniqueCode=${traderId}&pageSize=5000`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const {data, pageCount} = await response.json() as { data: OkxHistoryOrder[], pageCount: number }
    console.log("getOkxHistoryOrder:", data.length);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unknown error occurred, check console for more message", {
        position: "top-center",
      });
    }
    console.error("Failed to fetch order data:", error);
    return [];
  }
}

export default function AnalysisPage() {
  const [order, setOrder] = useState<BitGetHistoryOrder[]>([]);
  // const [binanceOrder, setBinanceOrder] = useState<BinanceHistoryOrder[]>([]);
  const [okxOrder, setOkxOrder] = useState<OkxHistoryOrder[]>([]);
  const [traderId, setTraderId] = useState<string>('');
  const [okxOraderId, setOkxTraderId] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTraderId(event.target.value);
  };

  useEffect(() => {
    if (traderId) {
      getBitgetHistoryOrder(traderId).then(data => setOrder(data));
    }
  }, [traderId]);
  useEffect(() => {
    if (okxOraderId) {
      getOkxHistoryOrder(okxOraderId).then(data => setOkxOrder(data));
    }
  }, [okxOraderId]);

  const handleBitgetOrderSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const id = formData.get('bitgetTraderId') as string;
    setTraderId(id);
  };
  // const tasks = await getBitgetHistoryOrder()
  const handleOKXSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const id = formData.get('okxTraderId') as string;
    setOkxTraderId(id);
  };

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Tabs defaultValue="Bitget" className="space-y-4">
          <TabsList>
            <TabsTrigger value="Bitget">Bitget</TabsTrigger>
            <TabsTrigger value="binance">Binance</TabsTrigger>
            <TabsTrigger value="okx">OKX</TabsTrigger>
          </TabsList>
          <TabsContent value="Bitget" className="space-y-4">
            {/* <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"> */}
            <div>
              <form onSubmit={handleBitgetOrderSubmit}>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input name="bitgetTraderId" placeholder="Search Bitget TraderId" className="pl-8" />
                </div>
              </form>
            </div>
            <DataTable data={order} columns={orderColumns} />
          </TabsContent>
          <TabsContent value="binance" className="space-y-4">
            <div >
              {/* <form onSubmit={handleBinanceSubmit}> */}
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input name="binanceTraderId" placeholder="Search Binance TraderId" className="pl-8" />
                </div>
              </form>
            </div>
            {/* <DataTable data={binanceOrder} columns={binanceOrderColumns} /> */}
          </TabsContent>
          <TabsContent value="okx" className="space-y-4">
            <div >
              <form onSubmit={handleOKXSubmit}>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input name="okxTraderId" placeholder="Search OKX TraderId" className="pl-8" />
                </div>
              </form>
            </div>
            <DataTable data={okxOrder} columns={okxOrderColumns} />
          </TabsContent>
        </Tabs>

        <Separator/>

        

      </div>

    </>
  )
}
