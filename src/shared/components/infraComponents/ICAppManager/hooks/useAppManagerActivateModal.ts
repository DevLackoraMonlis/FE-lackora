import { useMutation } from "@tanstack/react-query";
import type { ICAppManagerProps } from "../index.types";

export type Params = {
  code?: string;
  submitActivationCodeHandler: ICAppManagerProps["submitActivateAppApi"];
};

export const useAppManagerActivateModal = (params: Params) => {
  const submitActivationCode = useMutation({
    mutationKey: ["send-activation-code"],
    mutationFn: params.submitActivationCodeHandler,
    onMutate: () => ({ message: "Code is Valid" }), 
  });

  return { submitActivationCode };
};
