import axios from "axios";
import { useRouter } from "next/router";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { createContext } from "vm";

type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

type AuthContextType = {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    address: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:3001/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.User);
      router.push("/");
    } catch (error) {
      toast.error("Failed to sign in");
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    address: string
  ) => {
    try {
      const { data } = await axios.post("http://localhost:3001/auth/signup", {
        name,
        email,
        password,
        phoneNumber,
        address,
      });
      localStorage.setItem("token", data.token);
      setUser(data.User);
    } catch (error) {
      toast.error("Failed to sign up");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("tokeb");
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
  });

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
