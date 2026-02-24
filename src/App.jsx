import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './features/auth/authSlice';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, user]);

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
