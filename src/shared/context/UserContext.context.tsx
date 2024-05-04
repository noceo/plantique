"use client";

import { PropsWithChildren, createContext, useState, useContext } from "react";
import User from "../interfaces/user.interface";

export interface UserContext {
  user: User | null;
  setUser: (user: User) => void;
  loggedIn: boolean;
}

export const UserContext = createContext<UserContext | null>(null);

export const useUser = () => useContext<UserContext | null>(UserContext);

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const loggedIn = Boolean(user);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
