"use client";
import { ButtonText } from "@/app/components/atoms/common/ButtonText";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import InputText from "@/app/components/atoms/common/InputText";
import { InputTextWithIcon } from "@/app/components/atoms/common/InputTextWithIcon";
import { getCookie, setCookie } from "@/app/utils/cookies/cookieUtils";
import axios from "axios";
import { loginApi } from "@/app/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { login, logout as logoutRedux } from "@/app/redux/authSlice";
import { useRouter } from "next/navigation";

const logo = require("../assets/logo/TuPrivada.png");

const Login = () => {
  const router = useRouter();

  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getCookie("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const handleLogin = (token: string) => {
    setCookie("token", token, 1);

    dispatch(login(token));
    setToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let username = "";
      let password = "";
      if (userRef && userRef.current) {
        username = userRef.current.value;
      }
      if (passwordRef && passwordRef.current) {
        password = passwordRef.current.value;
      }
      const response = await loginApi(username, password);
      console.log("Respuesta del servidor:", response);
      if (response.token) {
        handleLogin(response.token);
      }

      router.push("/");
    } catch (error) {
      console.error("Error al enviar datos de inicio de sesión:", error);
      // Maneja los errores aquí
    }
  };

  return (
    <div className="login__container">
      <Image
        className="login__logo"
        src={logo}
        width={250}
        priority
        alt="Picture of logo"
        style={{ marginTop: "87px" }}
      />
      <form onSubmit={handleSubmit}>
        <InputText
          classname="login__InputText"
          placeholder="example@mail.com"
          ref={userRef}
        />
        <InputTextWithIcon
          classname="login__InputTextWithIcon"
          ref={passwordRef}
          placeholder="Contraseña"
        />
        <ButtonText
          onClick={handleSubmit}
          classname="login__btnLogin"
          text="Login"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Login;
