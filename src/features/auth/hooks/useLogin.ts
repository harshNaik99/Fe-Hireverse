import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../../api/auth.api";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginAPI,

    onSuccess: () => {

      navigate({ to: "/jobs", replace: true }); 
    },

    onError: (err: any) => {
      alert(err.response?.data?.MESSAGE || err.message);
    },
  });
};
