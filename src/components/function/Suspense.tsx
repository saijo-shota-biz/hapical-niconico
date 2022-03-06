import { Loading } from '@ui/utils/Loading';
import { FC, Suspense as ReactSuspense } from 'react';

export const Suspense: FC = ({ children }) => {
  return <ReactSuspense fallback={<Loading />}>{children}</ReactSuspense>;
};
