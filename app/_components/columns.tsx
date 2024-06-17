"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BitGetHistoryOrder, OkxHistoryOrder } from "../(marketing)/analysis/page"
import { DataTableColumnHeader } from "./data-table-column-header"
import { ExchangeApiInfo } from "../(dashboard)/exchanges/page"

// export const orderColumns: ColumnDef<Payment>[] = [
export const orderColumns: ColumnDef<BitGetHistoryOrder>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "symbol",
    header: "仓位",
    cell: ({ row }) => (
      <div>{row.getValue("symbol")}</div>
    ),
  },
  {
    accessorKey: "posSide",
    header: "方向",
    cell: ({ row }) => (
      <div>{row.getValue("posSide")}</div>
    ),
  },
  {
    accessorKey: "openSize",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="数量" />
    ),
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       数量
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   )
    // },
    cell: ({ row }) => (
      <div>{row.getValue("openSize")}</div>
    ),
  },
  {
    accessorKey: "openPriceAvg",
    header: "持仓均价",
    cell: ({ row }) => (
      <div>{row.getValue("openPriceAvg")} USDT</div>
    ),
  },
  {
    accessorKey: "closePriceAvg",
    header: "平仓价",
    cell: ({ row }) => (
      <div>{row.getValue("closePriceAvg")} USDT</div>
    ),
  },
  {
    accessorKey: "margin",
    header: "已实现盈亏",
    cell: ({ row }) => {
      const margin2 = row.getValue("closePriceAvg") as number;
      const margin1 = row.getValue("openPriceAvg") as number;
      const size = row.getValue("openSize") as number;
      var margin = size*(margin2 - margin1);
      if (row.getValue("posSide")=="short") {
        margin = -margin;
      }
      const marginFormatted = margin.toFixed(2);
      const textColor = margin >= 0 ? "text-green-500" : "text-red-500";
      const formattedMarginAmount = margin >= 0 ? `+${marginFormatted}` : marginFormatted;

      return (
        <div className="w-5 whitespace-nowrap">
          <span className={textColor}>{formattedMarginAmount}</span> USDT
        </div>
      )
    },
    // enableSorting: false,
  },
  {
    accessorKey: "trackingNo",
    // header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="trackingNo" />
    //     ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          订单编号
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("trackingNo")}</div>
    ),
  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  // },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)

  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.trackingNo)}
            >
              Copy TrackingNo
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const okxOrderColumns: ColumnDef<OkxHistoryOrder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "instId",
    header: "仓位",
    cell: ({ row }) => (
      <div>{row.getValue("instId")}</div>
    ),
  },
  {
    accessorKey: "posSide",
    header: "方向",
    cell: ({ row }) => (
      <div>{row.getValue("posSide")}</div>
    ),
  },
  {
    accessorKey: "subPos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="数量" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("subPos")}</div>
    ),
  },
  {
    accessorKey: "openAvgPx",
    header: "持仓均价",
    cell: ({ row }) => (
      <div>{row.getValue("openAvgPx")} USDT</div>
    ),
  },
  {
    accessorKey: "closeAvgPx",
    header: "平仓价",
    cell: ({ row }) => (
      <div>{row.getValue("closeAvgPx")} USDT</div>
    ),
  },
  {
    accessorKey: "margin",
    header: "已实现盈亏",
    cell: ({ row }) => {
      const margin2 = row.getValue("closeAvgPx") as number;
      const margin1 = row.getValue("openAvgPx") as number;
      const size = row.getValue("subPos") as number;
      var margin = size*(margin2 - margin1);
      if (row.getValue("posSide")=="short") {
        margin = -margin;
      }
      const marginFormatted = margin.toFixed(2);
      const textColor = margin >= 0 ? "text-green-500" : "text-red-500";
      const formattedMarginAmount = margin >= 0 ? `+${marginFormatted}` : marginFormatted;

      return (
        <div className="w-5 whitespace-nowrap">
          <span className={textColor}>{formattedMarginAmount}</span> USDT
        </div>
      )
    },
    // enableSorting: false,
  },
  {
    accessorKey: "subPosId",
    // header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="trackingNo" />
    //     ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          订单编号
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subPosId")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.subPosId)}
            >
              Copy SubPosId
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const exchangeApiInfoColumns: ColumnDef<ExchangeApiInfo>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "id",
  //   header: "id",
  //   cell: ({ row }) => (
  //     <div>{row.getValue("id")}</div>
  //   ),
  // },
  {
    accessorKey: "exchangeName",
    header: "Exchange",
    cell: ({ row }) => (
      <div>{row.getValue("exchangeName")}</div>
    ),
  },
  {
    accessorKey: "apiKey",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ApiKey" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("apiKey")}</div>
    ),
  },
  {
    accessorKey: "secretKey",
    header: "SecretKey",
    cell: ({ row }) => (
      <div>{row.getValue("secretKey")}</div>
    ),
  },
  {
    accessorKey: "passphrase",
    header: "Passphrase",
    cell: ({ row }) => (
      <div>{row.getValue("passphrase")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>{row.getValue("description")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.apiKey)}
            >
              Copy apiKey
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// export const columns: ColumnDef<Task>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//         className="translate-y-[2px]"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//         className="translate-y-[2px]"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "symbol",
//     header: "symbol",
//     cell: ({ row }) => (
//       <div>{row.getValue("symbol")}</div>
//     ),
//   },
//   {
//     accessorKey: "posSide",
//     header: "posSide",
//     cell: ({ row }) => (
//       <div>{row.getValue("posSide")}</div>
//     ),
//   },
//   {
//     accessorKey: "openPriceAvg",
//     header: "openPriceAvg",
//     cell: ({ row }) => (
//       <div>{row.getValue("openPriceAvg")}</div>
//     ),
//   },
//   {
//     accessorKey: "closePriceAvg",
//     header: "closePriceAvg",
//     cell: ({ row }) => (
//       <div>{row.getValue("closePriceAvg")}</div>
//     ),
//   },
//   {
//     accessorKey: "trackingNo",
//     header: "trackingNo",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("trackingNo")}</div>
//     ),
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => <DataTableRowActions row={row} />,
//   },
// ]