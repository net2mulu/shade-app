import { createContext, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { SIGN_IN } from "../apollo/mutations";
import { GET_USER } from "../apollo/queries";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  // apollo graphql queries
  const [signIn, { loading: sign_in_loading }] = useMutation(SIGN_IN, {
    fetchPolicy: "network-only",
  });

  const signInFunc = (phoneNumber, password) => {
    const searchParams = new URLSearchParams(search).get("redirectTo");

    signIn({
      variables: { phoneNumber, password },
      onCompleted(data) {
        let signInResponse = data?.signIn;

        localStorage.setItem(
          "refresh_token",
          signInResponse?.tokens?.refresh_token
        );
        localStorage.setItem(
          "access_token",
          signInResponse?.tokens?.access_token
        );
        localStorage.setItem("user_id", signInResponse?.data?.id);
        localStorage.setItem("shed_user_data", JSON.stringify(signInResponse?.data));

        if (searchParams) {
          navigate(searchParams);
        } else {
          navigate("/dashboard");
        }
      },
      onError(err) {
        if (err.message === "INVALID_CREDENTIALS") {
          toast.error("Incorrect email or password!");
        } else {
          toast.error("Something went wrong");
        }
      },
    });
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        signInFunc,
        logOut,
        sign_in_loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
