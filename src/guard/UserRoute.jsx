import { Navigate, Outlet } from "react-router-dom";
import Login from "../scenes/Login";
import jwt from "jwt-decode"

const useAuth = () => {
    const token = localStorage.getItem('access-token')
    if (token && Date.now() < jwt(token)?.exp * 1000) {
        return true;
    }
    return false;
}

const UserRoute = () => {
    const isAuth = useAuth();
    console.log(isAuth);
    return isAuth ? <Outlet /> : < Navigate to= "/login" />
}

export default UserRoute