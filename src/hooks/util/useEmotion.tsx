import { BLUE, Emotion, HAPPY, NORMAL, SUPER_BLUE, SUPER_HAPPY } from '@/types/Calendar';

export const useEmotion = () => {
  const emotions: Emotion[] = [SUPER_HAPPY, HAPPY, NORMAL, BLUE, SUPER_BLUE];

  const isEmotionStr = (str: string): str is Emotion => {
    return str === SUPER_HAPPY || str === HAPPY || str === NORMAL || str === BLUE || str === SUPER_BLUE;
  };

  const getEmotionText = (emotion: Emotion) => {
    if (emotion === SUPER_HAPPY) {
      return '超幸せ';
    }
    if (emotion === HAPPY) {
      return '幸せ';
    }
    if (emotion === NORMAL) {
      return '普通';
    }
    if (emotion === BLUE) {
      return 'ブルー';
    }
    if (emotion === SUPER_BLUE) {
      return '超ブルー';
    }
    throw new Error(`引数に対応するテキストは存在しません。 引数: ${emotion}`);
  };

  return { isEmotionStr, emotions, getEmotionText };
};
