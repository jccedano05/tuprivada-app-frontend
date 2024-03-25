"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getCookie } from "@/app/utils/cookies/cookieUtils";
import { login } from "@/app/redux/authSlice";
import { validateToken } from "@/app/api/api";

const authorizedUser = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const isAuthenticated = useSelector(
      (state: RootState) => state.auth.isAuthenticated
    );
    const token = useSelector((state: RootState) => state.auth.token);
    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
      if (!isAuthenticated) {
        const tokenCookie = getCookie("token");
        if (tokenCookie !== null) {
          let isValidToken = false;

          const fetchResponse = async () => {
            const response = await validateToken(tokenCookie);
            isValidToken = response;
            console.log(isValidToken);
            if (isValidToken) {
              console.log("entro al token");
              dispatch(login(tokenCookie));
            } else {
              router.push("/login");
            }
          };
          fetchResponse();
        } else {
          router.push("/login");
        }
        dispatch(login(token));
      }
    }, [isAuthenticated, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default authorizedUser;
