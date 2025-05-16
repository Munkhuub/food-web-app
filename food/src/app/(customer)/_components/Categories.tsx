import { CategoryType } from "@/app/page";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

type CategoryProps = {
  category: CategoryType[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  handleAllDishesClick: () => void;
};

export const Categories = ({
  category,
  selectedCategory,
  setSelectedCategory,
  handleAllDishesClick,
}: CategoryProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  return (
    <div className="w-full h-[176px] bg-[#404040] px-12 py-8 flex flex-col gap-8">
      <h1 className="text-3xl/8 font-semibold text-white">Categories</h1>
      <div className="flex gap-2 w-full items-center relative">
        <Button
          variant="outline"
          size="icon"
          className="z-10 flex-shrink-0 border-none shadow-none bg-transparent hover:bg-transparent"
          onClick={handleScrollLeft}
          disabled={!showLeftArrow}
        >
          <ChevronLeft
            className={`${
              showLeftArrow ? "text-white" : "text-gray-500"
            } border-none`}
          />
        </Button>
        <div
          className="flex gap-2 overflow-x-auto scroll-smooth flex-nowrap w-full"
          ref={scrollContainerRef}
          onScroll={checkScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            className={`px-5 py-1 rounded-full flex gap-2 text-[14px] whitespace-nowrap ${
              selectedCategory === ""
                ? "bg-[#EF4444] text-white"
                : "bg-white text-black"
            }`}
            onClick={handleAllDishesClick}
          >
            All dishes
          </div>
          {category?.map((categories) => (
            <button
              className={`px-5 py-1 rounded-full whitespace-nowrap flex-shrink-0 flex gap-2  text-[14px] ${
                selectedCategory === categories._id
                  ? "bg-[#EF4444] text-white"
                  : "bg-white text-black"
              }`}
              key={categories._id}
              onClick={() => setSelectedCategory(categories._id)}
            >
              {categories.categoryName}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="text-700 z-10 flex-shrink-0 border-none shadow-none bg-transparent hover:bg-transparent"
          onClick={handleScrollRight}
          disabled={!showRightArrow}
        >
          <ChevronRight
            className={`${showLeftArrow ? "text-white" : "text-gray-500"} `}
          />
        </Button>
      </div>
    </div>
  );
};
