export default interface User {
  id: number;
  email: string;
  name?: string;
  accessToken: string;
  role: "user" | "guest";
}
