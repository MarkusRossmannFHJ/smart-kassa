import { Button } from "../components/ui/button";
import { homeContent } from "../content/home/homeContent";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"; // <-- hinzugefügt
/**
 * @returns Home Page
 */
function Home() {

  return (
    <div className="w-full flex-1 flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{homeContent.pageTitle}</h2>
        <h3>{homeContent.pageSubtitle}</h3>
      </div>

     {homeContent.sections.map((section, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
  >
    <Card
      className={`
        flex-1 max-w-[400px] mx-auto
        ${section.color} 
        rounded-xl
        flex flex-col items-center justify-center gap-8 p-4
      `}
    >
      <CardHeader className="p-0 text-center">
        <CardTitle className="font-extrabold text-2xl">
          {section.title}
        </CardTitle>
        <img
          src={section.image}
          width={120}
          height={80}
          alt="Fahrten-Bild"
          className="object-cover"
        />
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-8">
          {section.buttons.map((element, index) => (
            <Button className="px-6 py-3 text-lg" key={index}>
              {element}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
))}
    </div>
  );
}

export default Home;
