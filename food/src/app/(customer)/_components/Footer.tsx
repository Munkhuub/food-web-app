import React from "react";
import { motion } from "framer-motion";
import FacebookIcon from "./_assets/FacebookIcon";
import InstagramIcon from "./_assets/InstagramIcon";
import { CopyrightIcon } from "lucide-react";

const carousel = [
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
];

export const Footer = () => {
  const scrollVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 45,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="h-[700px] w-full bg-[#18181B] pt-15 pb-[53px]">
      <div className="h-[92px] bg-[#EF4444] flex items-center overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          variants={scrollVariants}
          animate="animate"
        >
          {carousel.map((item, i) => (
            <h2
              key={`item-${i}`}
              className="text-3xl font-semibold mr-[34px] text-white"
            >
              {item}
            </h2>
          ))}
          {carousel.map((item, i) => (
            <h2
              key={`duplicate-item-${i}`}
              className="text-3xl font-semibold mr-[34px] text-white"
            >
              {item}
            </h2>
          ))}
        </motion.div>
      </div>

      <div>
        <div className="w-full flex pt-[78px] px-22 justify-between">
          <div className="flex flex-col text-white gap-3 items-center">
            <img
              className="size-[46px] object-fit"
              src="/images/logo.png"
              alt="NomNom Logo"
            />
            <div>
              <div className="flex text-xl/7 font-semibold">
                <p className="text-[#EF4444] ">Nom</p>
                <p>Nom</p>
              </div>
              <p className="text-xs">Swift delivery</p>
            </div>
          </div>

          <div className="flex gap-[112px] mr-[186px]">
            <div className="flex flex-col spacing/4 text-[white]">
              <h5 className="text-[#71717A]">NOMNOM</h5>
              <p>Home</p>
              <p>Contact us</p>
              <p>Delivery zone</p>
            </div>
            <div className="flex flex-col spacing/4 text-[white]">
              <h5 className="text-[#71717A]">MENU</h5>
              <p>Beverages</p>
              <p>Appetizers</p>
              <p>Lunch favorites</p>
              <p>Salads</p>
            </div>
            <div className="flex flex-col spacing/4 text-[white]">
              <p className="mt-5">Side dish</p>
              <p>Brunch</p>
              <p>Desserts</p>
              <p>Beverages</p>
              <p>Fish & Sea foods</p>
            </div>
            <div className="flex flex-col gap-4 w-[122px]">
              <h5 className="text-[#71717A]">FOLLOW US</h5>
              <div className="flex gap-4">
                <FacebookIcon />
                <InstagramIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* policy here */}
      <div className="flex text-[#71717A] gap-[48px] mx-22 h-21 border-t border-[#71717A] items-center mt-[102px]">
        <div className="flex items-center">
          <p>Copy right 2025</p>
          <CopyrightIcon className="h-[13px] w-5" />
          <p>Nomnom LLC</p>
        </div>
        <p>Privacy policy</p>
        <p>Terms and conditoin</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};
