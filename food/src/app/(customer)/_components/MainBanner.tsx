import React, { useState, useEffect, useMemo, useRef } from "react";

interface FoodItem {
  name: string;
  image: string;
  color: string;
  description: string;
}

type Viewport = "mobile" | "tablet" | "desktop";

const useViewport = (): Viewport => {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewport(width < 640 ? "mobile" : width < 1024 ? "tablet" : "desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
};

export const MainBanner: React.FC = () => {
  const [currentFood, setCurrentFood] = useState(0);
  const viewport = useViewport();
  const animationRef = useRef<number | null>(null);

  const foodItems: FoodItem[] = useMemo(
    () => [
      {
        name: "Pizza",
        image:
          "https://res.cloudinary.com/dpbmpprw5/image/upload/v1752916609/pngtree-pizza-png-image_15719093_w8mb0a.png",
        color: "from-red-500 to-orange-500",
        description: "Italian perfection",
      },
      {
        name: "Burger",
        image:
          "https://res.cloudinary.com/dpbmpprw5/image/upload/v1752916728/pngtree-delicious-and-testy-cheese-burger-png-image_16763714_cgwht3.png",
        color: "from-yellow-500 to-orange-600",
        description: "Classic comfort",
      },
      {
        name: "Sushi",
        image:
          "https://res.cloudinary.com/dpbmpprw5/image/upload/v1752916884/japanese-food-sushi-isolated-transparent-png_iksok8.png",
        color: "from-green-500 to-teal-500",
        description: "Japanese artistry",
      },
      {
        name: "Salad",
        image:
          "https://res.cloudinary.com/dpbmpprw5/image/upload/v1752914768/406447349_70fdd95b-efea-499d-bad0-ae5fc57746ed_1_rconys.png",
        color: "from-purple-500 to-pink-500",
        description: "Greece delight",
      },
    ],
    []
  );

  // Viewport configuration
  const vpConfig = useMemo(() => {
    return {
      mobile: {
        radius: 100,
        size: 96,
        border: "border-2",
        blur: "blur-xl",
        container: "w-64 h-64",
      },
      tablet: {
        radius: 140,
        size: 128,
        border: "border-3",
        blur: "blur-2xl",
        container: "w-80 h-80",
      },
      desktop: {
        radius: 180,
        size: 192,
        border: "border-4",
        blur: "blur-3xl",
        container: "w-[500px] h-[500px]",
      },
    }[viewport];
  }, [viewport]);

  const circularPositions = useMemo(() => {
    return foodItems.map((_, index) => {
      const angle = index * 90 * (Math.PI / 180);
      const radius = vpConfig.radius;

      return {
        x: Math.cos(angle - Math.PI / 2) * radius,
        y: Math.sin(angle - Math.PI / 2) * radius,
      };
    });
  }, [foodItems, vpConfig]);

  useEffect(() => {
    const animate = () => {
      setCurrentFood((prev) => (prev + 1) % foodItems.length);
      animationRef.current = requestAnimationFrame(() =>
        setTimeout(animate, 3000)
      );
    };

    animationRef.current = requestAnimationFrame(() =>
      setTimeout(animate, 3000)
    );

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [foodItems.length]);

  const current = foodItems[currentFood];

  return (
    <div className="relative max-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-40 h-40 sm:w-56 sm:h-56 lg:w-96 lg:h-96 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-4 sm:px-6 lg:px-16 py-8 lg:py-0">
        <div className="flex-1 max-w-2xl text-center lg:text-left mb-8 lg:mb-0">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-white leading-tight">
              Taste the{" "}
              <span
                className={`bg-gradient-to-r ${current.color} bg-clip-text text-transparent animate-pulse block sm:inline`}
              >
                {current.name}
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light">
              {current.description}
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-lg leading-relaxed mx-auto lg:mx-0">
              Experience culinary excellence with our selection of world-class
              dishes.
            </p>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-md sm:max-w-lg lg:max-w-none">
          <div className={`relative mx-auto ${vpConfig.container}`}>
            <div
              className="absolute inset-0 transition-transform duration-1000 ease-in-out will-change-transform"
              style={{
                transform: `rotate(${-currentFood * 90}deg)`,
              }}
            >
              {foodItems.map((item, index) => {
                const positions = circularPositions[index];
                const isActive = index === currentFood;

                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 will-change-transform"
                    style={{
                      transform: `translate(${
                        positions.x - vpConfig.size / 2
                      }px, ${positions.y - vpConfig.size / 2}px) rotate(${
                        currentFood * 90
                      }deg)`,
                    }}
                  >
                    <div
                      className={`relative transition-all duration-700 will-change-transform ${
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-75 opacity-40"
                      }`}
                    >
                      {isActive && (
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full ${vpConfig.blur} opacity-60 scale-150 animate-pulse`}
                        ></div>
                      )}

                      <div
                        className={`relative rounded-full overflow-hidden ${
                          vpConfig.border
                        } ${
                          isActive
                            ? "border-white shadow-xl"
                            : "border-gray-300 shadow-lg"
                        }`}
                        style={{
                          width: `${vpConfig.size}px`,
                          height: `${vpConfig.size}px`,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
