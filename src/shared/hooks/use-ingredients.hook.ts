import { useQuery } from "@tanstack/react-query";
import { ResponseError } from "../services/httpClient.service";
import Ingredient from "../interfaces/ingredient.interface";

interface UseIngredientsProps {
  queryKey?: string[];
  endpoint: string;
  accessToken?: string;
}

export default function useIngredients({
  queryKey,
  endpoint,
  accessToken,
}: UseIngredientsProps) {
  return useQuery({
    queryKey: queryKey || ["ingredients"],
    retry: false,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ingredients${endpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new ResponseError("Bad response", res);
      }

      const ingredients = await res.json();
      return ingredients as Ingredient[];
    },
  });
}
