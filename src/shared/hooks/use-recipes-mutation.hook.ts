import { useMutation, useQueryClient } from "@tanstack/react-query";
import Recipe, { RecipeMutation } from "../interfaces/recipe.interface";
import { ResponseError } from "../services/httpClient.service";

interface UseRecipeMutationProps {
  mutationKey: string;
  endpoint: string;
  method: "POST" | "PUT" | "DELETE";
  accessToken?: string;
}

export default function useRecipeMutation({
  mutationKey,
  endpoint,
  method,
  accessToken,
}: UseRecipeMutationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    // @ts-ignore
    mutationKey: mutationKey,
    mutationFn: async (data?: RecipeMutation) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes${endpoint}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new ResponseError("Bad response", res);
      }

      const recipe = await res.json();
      return recipe as Recipe;
    },
    onSuccess: () => {
      console.log("SUCCESS: ", mutationKey);
      queryClient.invalidateQueries({ queryKey: [mutationKey] });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
}
