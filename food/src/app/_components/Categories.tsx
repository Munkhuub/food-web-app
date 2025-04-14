import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const category = {
  button1: "Appetizers",
  button2: "Appetizers",
  button3: "Appetizers",
  button4: "Appetizers",
  button5: "Appetizers",
  button6: "Appetizers",
  button7: "Appetizers",
  button8: "Appetizers",
  button9: "Appetizers",
  button10: "Appetizers",
  button11: "Appetizers",
};

export const Categories = () => {
  return (
    <div className="w-full h-[176px] bg-[#404040] px-12 py-8 flex flex-col gap-8">
      <h1 className="text-3xl/8 font-semibold text-white">Categories</h1>
      <div className="flex gap-2 w-full">
        <Button variant="outline" size="icon" className="bg-[#404040]">
          <ChevronLeft className="text-white border-none" />
        </Button>
        <div className="flex gap-2 overflow-x-hidden">
          {Object.values(category).map((item, i) => (
            <button
              className="px-5 py-1 bg-white rounded-full overflow-scroll"
              key={i}
            >
              {item}
            </button>
          ))}
        </div>
        <Button variant="outline" size="icon" className="bg-[#404040]">
          <ChevronRight className="text-white border-none" />
        </Button>
      </div>
    </div>
  );
};
