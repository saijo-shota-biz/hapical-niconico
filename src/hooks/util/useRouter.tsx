import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const useRouter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();

  const push = (url: string) => {
    navigate(url);
  };

  return { push, pathname, params };
};
