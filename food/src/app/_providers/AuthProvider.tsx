"use client";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { createContext } from "react";
import { api, setAuthToken } from "@/axios";

export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  address: string;
  role: string;
};

type AuthContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  loading: boolean;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signUp: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await api.post("/auth/signin", {
        email,
        password,
      });
      console.log("SignIn response data:", data);
      localStorage.setItem("token", data.token);
      setUser(data.user);

      router.push("/");
    } catch (error) {
      console.error("Signin error:", error);
      toast.error("Failed to sign in");
    }
  };

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await api.post("/auth/signup", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/signin");
    } catch {
      toast.error("Failed to sign up");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;
    setAuthToken(token);
    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/auth/me", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setUser(data);
      } catch {
        localStorage.removeItem("token");
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, loading, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
