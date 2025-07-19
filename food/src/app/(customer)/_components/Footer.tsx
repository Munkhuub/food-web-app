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
];

export const Footer = () => {
  const scrollVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="w-full bg-[#18181B] pt-10 pb-8 sm:pt-15 sm:pb-[53px]">
      <div className="h-16 sm:h-[92px] bg-[#EF4444] flex items-center overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          variants={scrollVariants}
          animate="animate"
        >
          {[...carousel, ...carousel].map((item, i) => (
            <h2
              key={`item-${i}`}
              className="text-xl sm:text-2xl md:text-3xl font-semibold mr-4 sm:mr-8 md:mr-[34px] text-white"
            >
              {item}
            </h2>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="w-full flex flex-col md:flex-row pt-8 sm:pt-12 md:pt-[78px] justify-between gap-10">
          <div className="flex flex-col text-white gap-3 items-center md:items-start">
            <img
              className="w-10 h-10 md:size-[46px] object-contain"
              src="/images/logo.png"
              alt="NomNom Logo"
            />
            <div className="text-center md:text-left">
              <div className="flex text-xl md:text-2xl font-semibold justify-center md:justify-start">
                <p className="text-[#EF4444]">Nom</p>
                <p>Nom</p>
              </div>
              <p className="text-xs mt-1">Swift delivery</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 md:gap-[112px] md:mr-[186px]">
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-4 sm:gap-6">
              <div className="flex flex-col gap-4 text-white">
                <h5 className="text-[#71717A] text-sm md:text-base">NOMNOM</h5>
                <p className="text-sm md:text-base">Home</p>
                <p className="text-sm md:text-base">Contact us</p>
                <p className="text-sm md:text-base">Delivery zone</p>
              </div>

              <div className="flex flex-col gap-4 text-white">
                <h5 className="text-[#71717A] text-sm md:text-base">MENU</h5>
                <p className="text-sm md:text-base">Beverages</p>
                <p className="text-sm md:text-base">Appetizers</p>
                <p className="text-sm md:text-base">Lunch favorites</p>
                <p className="text-sm md:text-base">Salads</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-4 sm:gap-6">
              <div className="flex flex-col gap-4 text-white sm:mt-5">
                <p className="text-sm md:text-base">Side dish</p>
                <p className="text-sm md:text-base">Brunch</p>
                <p className="text-sm md:text-base">Desserts</p>
                <p className="text-sm md:text-base">Beverages</p>
                <p className="text-sm md:text-base">Fish & Sea foods</p>
              </div>

              <div className="flex flex-col gap-4 w-[122px]">
                <h5 className="text-[#71717A] text-sm md:text-base">
                  FOLLOW US
                </h5>
                <div className="flex gap-4">
                  <FacebookIcon />
                  <InstagramIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row flex-wrap text-[#71717A] gap-4 sm:gap-6 md:gap-[48px] py-6 border-t border-[#71717A] items-center justify-center sm:justify-start mt-8 sm:mt-12 md:mt-[102px] text-sm">
          <div className="flex items-center gap-1">
            <p>Copy right 2025</p>
            <CopyrightIcon className="h-3 w-3" />
            <p>Nomnom LLC</p>
          </div>
          <p>Privacy policy</p>
          <p>Terms and condition</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
};
