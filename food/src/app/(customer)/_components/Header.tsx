import { Button } from "@/components/ui/button";
import DeliveryAddress from "./DeliveryAddress";
import CartDetail from "./CartDetail";
import Link from "next/link";
import { useAuth } from "@/app/_providers/AuthProvider";
import { UserProfile } from "./UserProfile";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="w-full bg-[#18181B] px-4 sm:px-6 md:px-8 lg:px-10 py-3">
      <div className="flex items-center justify-between flex-wrap gap-4 max-w-7xl mx-auto">
        <div className="flex text-white gap-3 items-center flex-shrink-0">
          <img
            className="w-8 h-8 md:w-[38px] md:h-[38px] object-contain"
            src="/images/logo.png"
            alt="NomNom Logo"
          />
          <div>
            <div className="flex text-xl md:text-2xl font-semibold">
              <span className="text-[#EF4444]">Nom</span>
              <span>Nom</span>
            </div>
            <p className="text-xs hidden sm:block text-gray-300">
              Swift delivery
            </p>
          </div>
        </div>

        <div className="sm:hidden flex-1 min-w-[120px] max-w-[200px] overflow-hidden">
          <div className="w-full [&>*]:w-full [&>*]:max-w-full [&>*]:text-xs [&>*>*]:truncate">
            <DeliveryAddress />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
          <div className="hidden sm:block">
            <DeliveryAddress />
          </div>

          <CartDetail />

          {user ? (
            <UserProfile />
          ) : (
            <div className="flex gap-2 sm:gap-3">
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="rounded-full bg-white border-none text-[#71717A] hover:bg-gray-100 text-xs sm:text-sm px-3 sm:px-4 py-1 transition-colors"
                  size="sm"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/signUp">
                <Button
                  variant="outline"
                  className="rounded-full bg-white border-none text-[#71717A] hover:bg-gray-100 text-xs sm:text-sm px-3 sm:px-4 py-1 transition-colors"
                  size="sm"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
