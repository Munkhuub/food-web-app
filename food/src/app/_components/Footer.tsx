const carousel = [
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
];

export const Footer = () => {
  return (
    <div className="h-[700px] w-full bg-[#18181B] pt-15 pb-[53px] ">
      <div className="h-[92px] bg-[#EF4444] flex gap-[34px]">
        {carousel.map((item, i) => (
          <h2 className="text-3xl font-semibold" key={i}>
            <span>{item}</span>
          </h2>
        ))}
      </div>
      <div> "Fresh fast delivered"</div>
      <div></div>
    </div>
  );
};
