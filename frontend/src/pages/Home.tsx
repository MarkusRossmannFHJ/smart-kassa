import { Button } from "../components/ui/button";
import { homeContent } from "../content/home/homeContent";

/**
 * @returns Home Page
 */
function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Home</h2>
        <h3>Navigiere zu deinem Service</h3>
      </div>

      <div className="flex flex-col flex-1 gap-8">
        {homeContent.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-3 flex-1
      ${section.color} p-4 rounded-xl`}
          >
            <h4 className="font-extrabold">{section.title}</h4>
            <div className="grid grid-cols-2 gap-12">
              {section.buttons.map((element, index) => (
                <Button key={index}>{element}</Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
