import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ currentUser, role, children }) {
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (role && currentUser.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
}
