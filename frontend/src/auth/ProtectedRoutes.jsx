import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

export default function ProtectedRoutes (){
    const {user} = useAuth()
    return user ? <Outlet/> : <Navigate to={"/login"}></Navigate>
}