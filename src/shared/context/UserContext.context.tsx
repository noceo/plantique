"use client";

import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import User from "../interfaces/user.interface";
import { logout, verifyRefreshToken } from "../services/httpClient.service";

export interface UserContext {
  user: User | null;
  setUser: (user: User | null) => void;
  loggedIn: boolean;
}

export const UserContext = createContext<UserContext | null>(null);

export const useUser = () => useContext<UserContext | null>(UserContext);

const MINUTE = 60000;

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const loggedIn = Boolean(user);
  const [firstRender, setFirstRender] = useState(true);
  const refreshIntervalID = useRef<NodeJS.Timeout | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const refreshedUser = await verifyRefreshToken();
      setUser(refreshedUser);
    } catch (err) {
      console.log(err);
      return;
    }
  }, []);

  useEffect(() => {
    if (firstRender && !user) {
      console.log("BAD");
      checkAuth();
      setFirstRender(false);
    }
    if (user && !refreshIntervalID.current) {
      // run checkAuth function 10 minutes before access token expires
      const intervalID = setInterval(
        checkAuth,
        new Date(Date.parse(user.exp)).getTime() - 10 * MINUTE - Date.now()
      );
      refreshIntervalID.current = intervalID;
    }
    if (!firstRender && !user) {
      clearInterval(refreshIntervalID.current!);
      refreshIntervalID.current = null;
    }
  }, [firstRender, user, checkAuth]);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
