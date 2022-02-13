import { BlueIconColor } from '@ui/emotion/BlueIcon';
import { HappyIconColor } from '@ui/emotion/HappyIcon';
import { NormalIconColor } from '@ui/emotion/NormalIcon';
import { SuperBlueIconColor } from '@ui/emotion/SuperBlueIcon';
import { SuperHappyIconColor } from '@ui/emotion/SuperHappyIcon';

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

  const getEmotionIconColor = (emotion: Emotion) => {
    if (emotion === SUPER_HAPPY) {
      return SuperHappyIconColor;
    }
    if (emotion === HAPPY) {
      return HappyIconColor;
    }
    if (emotion === NORMAL) {
      return NormalIconColor;
    }
    if (emotion === BLUE) {
      return BlueIconColor;
    }
    if (emotion === SUPER_BLUE) {
      return SuperBlueIconColor;
    }
    throw new Error(`引数に対応するカラーは存在しません。 引数: ${emotion}`);
  };

  return { isEmotionStr, emotions, getEmotionText, getEmotionIconColor };
};
