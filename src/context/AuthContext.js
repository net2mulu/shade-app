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

  const [getUser, { data: user_data, loading: user_data_loading }] =
    useLazyQuery(GET_USER, {
      fetchPolicy: "network-only",
      context: {
        headers: {
          "x-hasura-role": "user",
        },
      },
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
        if (searchParams) {
          navigate(searchParams);
        } else {
          navigate("/dashboard");
        }

     
      },
      onError(err) {
        console.log(err);
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

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      getUser({
        variables: {
          where: {
            registration_id: {
              _eq: localStorage.getItem("user_id"),
            },
          },
        },
      });
    }
  }, [getUser]);

  return (
    <AuthContext.Provider
      value={{
        signInFunc,
        logOut,
        sign_in_loading,
        user_data_loading,
        user_data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
