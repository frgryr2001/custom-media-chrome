import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../types';

export function useMediaPlaybackRate(rates: number[] = [0.5, 1, 1.5, 2]) {
  const dispatch = useMediaDispatch();
  const currentRate = useMediaSelector((state) => state.mediaPlaybackRate) ?? 1;

  const cyclePlaybackRate = () => {
    const currentIndex = rates.indexOf(currentRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    dispatch({
      type: MediaActionTypes.MEDIA_PLAYBACK_RATE_REQUEST,
      detail: nextRate,
    });
  };

  const setPlaybackRate = (rate: number) => {
    dispatch({
      type: MediaActionTypes.MEDIA_PLAYBACK_RATE_REQUEST,
      detail: rate,
    });
  };

  return { currentRate, cyclePlaybackRate, setPlaybackRate };
}
