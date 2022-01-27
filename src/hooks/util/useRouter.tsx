import { useLocation, useNavigate } from 'react-router-dom';

export const useRouter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const push = (url: string) => {
    navigate(url);
  };

  return { push, pathname };
};
