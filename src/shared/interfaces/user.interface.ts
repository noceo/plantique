export default interface User {
  id: number;
  email: string;
  name?: string;
  accessToken: string;
  exp: string;
  role: "user" | "guest";
}
