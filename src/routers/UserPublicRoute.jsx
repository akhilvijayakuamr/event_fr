import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



const UserPublicRoute = ()=>{
    const access = useSelector((state)=>state.auth.user_access_token)
    const refresh = useSelector((state)=>state.auth.user_refresh_token)
    return access || refresh ? <Navigate to= "/home"/> : <Outlet/>
}

export default UserPublicRoute;