import { Button } from "../components/ui/button";
import { homeContent } from "../content/home/homeContent";

/**
 * @returns Home Page
 */
function Home() {
  return (
    <div className="w-full flex-1 flex flex-col gap-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Home</h2>
        <h3>Navigiere zu deinem Service</h3>
      </div>
    
           {homeContent.map((section, index) => (
          <div
            key={index}
            className={`p-4 flex-1 max-w-[400px] mx-auto flex flex-col items-center justify-center gap-8
      ${section.color} px-2 rounded-xl`}
          >
            <h4 className="font-extrabold text-xl">{section.title}</h4>
            <div className="grid grid-cols-2 gap-8">
              {section.buttons.map((element, index) => (
                <Button className="px-6 py-3 text-lg" key={index}>{element}</Button>
              ))}
            </div>
          </div>
        ))}
   
       
   
    </div>
  );
}

export default Home;
