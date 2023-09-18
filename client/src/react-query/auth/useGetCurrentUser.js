import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { logUserIn, logUserOut } from '../../store/authSlice';

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: '/api/v1/auth/current-user',
    });

    return res.data;
  };

  const onError = () => {
    dispatch(logUserOut());
  };

  const onSuccess = (data) => {
    const user = data.data;
    dispatch(logUserIn(user));
  };

  const {} = useQuery({
    queryFn,
    queryKey: ['users', 'current-user'],
    onSuccess,
    onError,
  });
};

export default useGetCurrentUser;
