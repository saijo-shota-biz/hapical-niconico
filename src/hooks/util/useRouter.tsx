import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';

const RedirectUrlState = atom({
  key: 'StateRedirectUrl',
  default: '',
});

export const useRouter = () => {
  const [redirectUrl, setRedirectUrl] = useRecoilState(RedirectUrlState);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();

  const push = (url: string) => {
    navigate(url);
  };

  const pushOrRedirectUrl = (url: string) => {
    if (redirectUrl) {
      push(redirectUrl);
      setRedirectUrl('');
    } else {
      push(url);
    }
  };

  return { push, pushOrRedirectUrl, setRedirectUrl, pathname, params };
};
