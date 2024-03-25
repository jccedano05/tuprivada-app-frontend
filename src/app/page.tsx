"use client";
import { useRouter } from "next/navigation";
import api from "./api/api";
import { logout as logoutRedux } from "@/app/redux/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "@/app/api/api";

import authorizedUser from "./components/templates/authorizedUser";

function Home() {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleGetInformation = async () => {
    try {
      const response = await api.get("/admin_only");
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("no se pudo obtener la info", error);
    }
  };

  const handleLogOut = async () => {
    await logout();
    dispatch(logoutRedux());

    router.push("/login");
  };

  return (
    <main>
      <h1>home</h1>

      <button onClick={handleGetInformation}>information</button>
      <button onClick={handleLogOut}>Logout</button>
    </main>
  );
}

export default authorizedUser(Home);
