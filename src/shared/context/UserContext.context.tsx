"use client";

import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import User from "../interfaces/user.interface";
import { verifyRefreshToken } from "../services/httpClient.service";

export interface UserContext {
  user: User | null;
  setUser: (user: User | null) => void;
  loggedIn: boolean;
}

export const UserContext = createContext<UserContext | null>(null);

export const useUser = () => useContext<UserContext | null>(UserContext);

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const loggedIn = Boolean(user);
  const [firstRender, setFirstRender] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const refreshedUser = await verifyRefreshToken();
      console.log("REFRESHED_USER: ", refreshedUser);
      setUser(refreshedUser);
    } catch (err) {
      return;
    }
  }, []);

  useEffect(() => {
    if (firstRender && !user) {
      checkAuth();
      setFirstRender(false);
    }
  }, [firstRender, user, checkAuth]);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
