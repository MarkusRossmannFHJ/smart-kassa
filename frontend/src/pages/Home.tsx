import { useSelector } from "react-redux";

import type { RootState } from "../../redux/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Balance from "@/components/Balance";
import { todayData } from "@/content/home/todayData";



function Home() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {/* HEADER */}
     <Tabs defaultValue="today" className="w-full flex flex-col">

  {/* ABOVE TEXT LEFT + TABS LIST RIGHT) */}
  <div className="w-full flex flex-col gap-4 md:flex-row justify-between items-center md:items-end">
    <div className="flex flex-col">
      <h2 className="ml-2 text-lg text-center md:text-start font-light">
        Hi {user.firstName || "Thomas"},
      </h2>

      <div className="w-full flex items-center gap-2 text-3xl">
        <span>👋</span>
        <span className="font-bold">Welcome Back!</span>
      </div>
    </div>

    {/* TabsList stays on the right and aligned with the header */}
    <TabsList className="grid grid-cols-3 w-full md:w-auto max-w-[400px]">
      <TabsTrigger value="today">Today</TabsTrigger>
      <TabsTrigger value="week">Week</TabsTrigger>
      <TabsTrigger value="month">Month</TabsTrigger>
    </TabsList>
  </div>

  {/* CONTENT SECTION – FULL WIDTH BELOW */}
  <div className="w-full mt-4">
    <TabsContent value="today">
      <Balance entry={todayData} />
    </TabsContent>

    <TabsContent value="week">
      <Balance />
    </TabsContent>

    <TabsContent value="month">
      <Balance />
    </TabsContent>
  </div>

</Tabs>



    </div>
  );
}

export default Home;
