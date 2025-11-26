import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { TodayDataEntry } from "@/content/home/todayData"
import type { WeekDataEntry } from "@/content/home/weekData";

import { MoveUpLeft, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";


import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

export type RidesStats = {
  day: string;
  rides: number;
};

const ridesData: RidesStats[] = [
  { day: "Mon", rides: 42 },
  { day: "Tue", rides: 57 },
  { day: "Wed", rides: 31 },
  { day: "Thu", rides: 68 },
  { day: "Fri", rides: 75 },
  { day: "Sat", rides: 54 },
  { day: "Sun", rides: 39 },
];

const chartConfig = {
  rides: {
    label: "Rides",
  },
}



type Metric = {
  label: string
  value: string
  trend: "up" | "down"
}

const metrics: Metric[] = [
  { label: "Store", value: "$3.236", trend: "up" },
  { label: "Online store", value: "$3.764", trend: "down" },
  { label: "Debt collection", value: "$1.800", trend: "up" },
  { label: "Other amounts", value: "$1.200", trend: "down" },
]

interface BalanceData {
  entry?: TodayDataEntry | WeekDataEntry
}

const Balance = ({ entry }: BalanceData) => {
  return (
    <Card className="w-full flex flex-col items-center md:flex md:justify-between
    py-2 gap-4">
      <CardHeader>
        <CardTitle className="text-xl md:text-3xl">Balance</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center
        md:items-start">
        <div className="w-full flex flex-col items-center justify-center 
        gap-4 md:flex-row md:gap-0
        md:justify-between">
          <div className="flex flex-row gap-4 items-center">
            <span className="text-7xl font-extrabold">
              ${entry?.totalRevenue}
            </span>
            <Badge className="flex items-center gap-1 px-3 py-1 text-sm
                   md:text-base bg-green-500/15 text-green-600 font-medium">
              <MoveUpLeft className="h-4 w-4" />
              +12.4%
            </Badge>
          </div>

          {/* Bar Chart */}
          <ChartContainer config={chartConfig} className="h-[200px] max-w-[600px]
          md:text-lg">
            <BarChart accessibilityLayer data={ridesData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
                <YAxis
                width={28}          
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="rides" fill="var(--color-rides)" radius={8}
                barSize={20} />
            </BarChart>
          </ChartContainer>

        </div>



      </CardContent>
      <CardFooter className="w-full border-none shadow-sm bg-car
      flex flex-row justify-center p-0">
        <div className="p-4 sm:p-6">
          <div
            className="
            grid gap-4
            grid-cols-2
            lg:grid-cols-4
          "
          >
            {metrics.map((item) => (
              <div
                key={item.label}
                className="
                flex items-center justify-center gap-3
                rounded-lg
              "
              >
                {/* Left side: label + value */}
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-lg sm:text-xl font-semibold">
                    {item.value}
                  </span>
                </div>

                {/* Right side: trend icon */}
                <div className="flex items-center justify-center">
                  {item.trend === "up" ? (
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Balance
