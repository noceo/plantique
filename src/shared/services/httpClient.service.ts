import User from "../interfaces/user.interface";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}

const isPlainObject = (value: unknown) => value?.constructor === Object;

async function customFetch<Type = any>(
  input: RequestInfo | URL,
  options?: RequestInit
) {
  let initOptions = options;
  if (initOptions?.body) {
    console.log(initOptions.body);
    if (Array.isArray(initOptions.body) || isPlainObject(initOptions.body)) {
      initOptions = {
        ...initOptions,
        body: JSON.stringify(initOptions.body),
        headers: {
          "Content-Type": "application/json",
          ...initOptions.headers,
        },
      };
    }
  }

  const res = await fetch(input, initOptions);
  if (!res.ok) {
    throw new ResponseError("Bad response", res);
  }
  return (await res.json()) as Type;
}

async function login(data: { email: string; password: string }) {
  try {
    let user = await customFetch<User>(`${BASE_URL!}/auth/login`, {
      credentials: "include",
      method: "POST",
      body: data as unknown as BodyInit,
    });
    return { ...user, role: "user" } as User;
  } catch (err: unknown) {
    if (err instanceof ResponseError) {
      switch (err.response.status) {
        case 404:
          console.log("404");
      }
    } else {
      throw new Error("An unknown error occured when fetching the user", {
        cause: err,
      });
    }
    return null;
  }
}

async function logout() {
  try {
    await customFetch(`${BASE_URL!}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
  } catch (err) {
    throw new Error("An unknown error occured while logging out", {
      cause: err,
    });
  }
}

async function verifyRefreshToken() {
  try {
    const user = await customFetch<User>(`${BASE_URL!}/auth/validate`, {
      method: "GET",
      credentials: "include",
    });
    return { ...user, role: "user" } as User;
  } catch (err: unknown) {
    if (err instanceof ResponseError) {
      switch (err.response.status) {
        case 401:
          throw new Error("Unauthorized");
      }
    } else {
      throw new Error("An unknown error occured when fetching the user", {
        cause: err,
      });
    }
    return null;
  }
}

export { login, logout, verifyRefreshToken };
