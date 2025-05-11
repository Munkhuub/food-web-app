"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { createContext } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

type AuthContextType = {
  user?: User;
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
      const { data } = await axios.post("http://localhost:3001/auth/signin", {
        email,
        password,
      });
      console.log("SignIn response data:", data);
      localStorage.setItem("token", data.token);
      setUser(data.user);

      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Something went wrong");
      }
      throw error;
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
      const { data } = await axios.post("http://localhost:3001/auth/signup", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/signin");
    } catch (error) {
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

    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3001/auth/me", {
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
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
