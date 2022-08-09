import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.js';

const PrivateRoute = ({children}) => {
    const { isAuthenticated } = useUserContext();

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default PrivateRoute;