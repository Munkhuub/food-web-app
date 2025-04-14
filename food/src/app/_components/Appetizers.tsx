const card = [
  {
    name: "Finger food ",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/images/food.png",
  },
  {
    name: "Finger food ",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/images/food.png",
  },
  {
    name: "Finger food ",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/images/food.png",
  },
  {
    name: "Finger food ",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/images/food.png",
  },
  {
    name: "Finger food ",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/images/food.png",
  },
  {
    name: "Finger food ",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/images/food.png",
  },
];

export const Appetizers = () => {
  return (
    <div className="px-22 bg-[#404040] pt-10 pb-[54px]">
      <h2 className="text-3xl font-semibold text-white">Appetizers</h2>
      <div className="grid grid-cols-3 gap-9 mt-[54px]">
        {card.map((food, i) => (
          <div
            className="w-[400px] h-[342px] p-4 bg-white rounded-[20px] flex flex-col gap-5"
            key={i}
          >
            <img
              src={food.image}
              className="h-[210px] w-full object-cover rounded-xl"
            />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h3 className="text-2xl text-[#EF4444] font-semibold">
                  Finger food
                </h3>
                <p className="text-[18px] font-semibold">$12.99</p>
              </div>
              <p>
                Fluffy pancakes stacked with fruits, cream, syrup, and powdered
                sugar.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
