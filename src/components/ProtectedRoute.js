import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

const ProtectedRoute = ({ children, loginOnly = true }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user && loginOnly) {
      navigate('/login')
    }
    if (user && !loginOnly) {
      navigate('/')
    }

  }, [user, loading])

  return loading ? <>loading...</> : children;
};

export default ProtectedRoute;
