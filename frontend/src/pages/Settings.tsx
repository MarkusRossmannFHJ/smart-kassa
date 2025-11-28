
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Account from "./Account"

const Settings = () => {

  return (
    <Tabs defaultValue="today" className="w-full flex flex-col">

      <TabsList className="grid grid-cols-3 w-full md:w-auto max-w-[400px]">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="theme">Theme</TabsTrigger>
   
      </TabsList>

      <div className="w-full mt-10">
        <TabsContent value="account">
          <Account></Account>
        </TabsContent>

        <TabsContent value="notifications">
          <p>Was geht</p>
        </TabsContent>

        <TabsContent value="theme">
          <p>yeah</p>
        </TabsContent>
      </div>

    </Tabs>

  )
}

export default Settings
