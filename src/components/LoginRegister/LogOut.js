import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import { UserContext } from "../../contexts/userContext.js";
import { logout } from "../../services/userService.js";

const LogOut = () => {
    
    const { user, userLogoutHandler } =  useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        logout(user.accessToken)
        .then(() => {
            userLogoutHandler();
            navigate('/')
        })
        .catch(() => {
            navigate('/404')
        })
    });

    return null;
}
export default LogOut;