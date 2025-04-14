"use client";
import Image from "next/image";
import { Header } from "./_components/Header";
import { MainBanner } from "./_components/MainBanner";
import { Categories } from "./_components/Categories";
import { Appetizers } from "./_components/Appetizers";
import { Salads } from "./_components/Salads";
import { Lunch } from "./_components/Lunch";
import { Salads2 } from "./_components/Salads2";
import { Footer } from "./_components/Footer";

export default function Home() {
  return (
    <div className="lg:w-[1440px] m-auto relative">
      <Header />
      <MainBanner />
      <Categories />
      <Appetizers />
      <Salads />
      <Lunch />
      <Salads2 />
      <Footer />
    </div>
  );
}
