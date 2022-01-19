import { useNavigate } from 'react-router-dom';

export const useRouter = () => {
  const navigate = useNavigate();

  const push = (url: string) => {
    navigate(url);
  };

  return { push };
};
