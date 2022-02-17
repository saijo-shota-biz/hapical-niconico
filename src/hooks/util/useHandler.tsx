import { useToaster } from '@hooks/components/useToaster';

export const useHandler = () => {
  const { showSuccessToast, showErrorToast } = useToaster();

  const handleCommand = <Args extends Array<any>, ReturnType>(
    func: (...args: Args) => Promise<ReturnType>,
    successMessage: string = '',
    failedMessage: string = ''
  ): ((...args: Args) => Promise<ReturnType>) => {
    return (...args: Args) =>
      func(...args)
        .then((e) => {
          if (successMessage) {
            showSuccessToast(successMessage);
          }
          return e;
        })
        .catch((e) => {
          if (failedMessage) {
            showErrorToast(failedMessage);
          }
          throw e;
        });
  };

  const handleAsyncEvent = <Args extends Array<any>, ReturnType>(
    func: (...args: Args) => Promise<ReturnType | void>,
    successFunc?: (result: ReturnType | void) => void,
    failedFunc?: (e: Error) => void
  ): ((...args: Args) => Promise<ReturnType | void>) => {
    return (...args: Args) =>
      func(...args)
        .then((e) => {
          if (successFunc) {
            return successFunc(e);
          }
          return e;
        })
        .catch((e) => {
          if (failedFunc) {
            failedFunc(e);
          }
        });
  };

  return { handleCommand, handleAsyncEvent };
};
