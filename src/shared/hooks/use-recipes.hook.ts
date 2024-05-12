import { useQuery } from "@tanstack/react-query";
import Recipe from "../interfaces/recipe.interface";
import { ResponseError } from "../services/httpClient.service";

interface UseRecipesProps {
  queryKey?: string[];
  endpoint: string;
  accessToken?: string;
}

export default function useRecipes({
  queryKey,
  endpoint,
  accessToken,
}: UseRecipesProps) {
  return useQuery({
    queryKey: queryKey || ["recipes"],
    retry: false,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes${endpoint}`,
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

      const recipes = await res.json();
      return recipes as Recipe[];
    },
  });
}
